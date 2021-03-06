/*
 * Copyright 2016 e-UCM (http://www.e-ucm.es/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * This project has received funding from the European Union’s Horizon
 * 2020 research and innovation programme under grant agreement No 644187.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0 (link is external)
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'),
    router = express.Router();

var getBasePath = function(req) {
    let proto = req.headers['x-forwarded-proto'];
    let host = proto + '://' + req.headers['x-forwarded-host'];

    if (req.protocol === 'https') {
        host =  'https://' + req.headers['x-forwarded-host'];
    }

    if (host.substr(-1) !== '/'){
        host += '/';
    }

    return host + req.app.config.basePath;
};

router.get('/view/:page', function (req, res) {
    res.render('view/' + req.param('page'), {basePath: getBasePath(req)});
});

router.get('*', function (req, res) {
    res.render('page', {basePath: getBasePath(req)});
});

module.exports = router;