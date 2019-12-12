import { body, param, validationResult } from 'express-validator';


export default function routes(app, addon) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    // App entry - servers the basic web page that includes the bundle
    app.get('/my-app', addon.authenticate(), (req, res) => {
        res.render('app', {});
    });

    // Rest API
    app.get('/resource', addon.authenticate(), (req, res) => {
        res.status(200).json([{id : 1, name: 'First resource'}])
    });

    app.post('/resource', [
        body('id').isInt().exists(),
        body('name').isString().isLength({ min: 1, max: 255 }).exists(),
    ], addon.authenticate(), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        
        res.status(201).json({
            id: req.body.id,
            name: req.body.name
        })
    });

    app.delete('/resource/:id', [
        param('id').isInt().exists()
    ], addon.authenticate(), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        
        res.status(204).send();
    });

    app.put('/resource/:id', [
        param('id').isInt().exists(),
        body('name').isString().isLength({ min: 1, max: 255 }).exists(),
    ], addon.authenticate(),async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        
        res.status(200).json({
            id: req.param.id,
            name: req.body.name
        });
    });
}
