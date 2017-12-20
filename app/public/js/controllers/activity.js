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

angular.module('activityApp', ['myApp', 'ngStorage', 'services'])
    .factory('_', ['$window', function ($window) {
        return $window._;
    }])
    .config(['$locationProvider',
        function ($locationProvider) {
            $locationProvider.html5Mode(false);
        }
    ])
    .directive('reports', function () {
        return function (scope, element) {
            new RadialProgress(angular.element(element).children('.progress-marker')[0], scope.result.progress);
            new ColumnProgress(angular.element(element).children('.score-marker')[0], scope.result.score);
        };
    })
    .controller('ActivityCtrl', ['$rootScope', '$scope', '$attrs', '$location', '$http', 'Activities', 'Classes', '_',
        'Results', 'Versions', '$sce', '$interval', 'CONSTANTS',
        function ($rootScope, $scope, $attrs, $location, $http, Activities, Classes, _, Results, Versions, $sce, $interval, CONSTANTS) {

            var init = function () {
                var activityId = $attrs.activityid;

                //jscs:disable requireSpaceAfterLineComment
                //jscs:disable maximumLineLength

                var viauslizationIds = ['AWASvrqw859DaphyNpzt' + activityId,
                    'AWASNOIN859DaphyNiF1' + activityId,
                    'AWASMtve859DaphyNh-t' + activityId,
                    'AWAiTWooUurT9k2FEVMn' + activityId,
                    'AWAiUExdUurT9k2FEVYN' + activityId,
                    'AWAmorJcaTSz3ztgr2Ha' + activityId,
                    'AWAmxuffaTSz3ztgr4jn' + activityId,
                    'AWAnB_mZaTSz3ztgr87N' + activityId];

                var visualizations = [{
                    title: 'AVERAGE OFFICE MORALE',
                    visState: '{"title":"AVERAGE OFFICE MORALE","type":"badges-vis","params":{"division":false,"imageUrl":"https://github.com/e-ucm/badges-vis/raw/master/images/badges/fire.png","numeralFormat":"[{ \\\"numeralFormat\\\" : \\\"%0,00\\\" }]","numerator":true,"text":"AVERAGE OFFICE MORALE","type":"badges-vis","useNumerator":false,"value":"0"},"aggs":[{"id":"1","enabled":true,"type":"avg","schema":"metric","params":{"field":"out.ext.officeMorale"}},{"id":"2","enabled":true,"type":"filters","schema":"buckets","params":{"filters":[{"input":{"query":{"query_string":{"query":"*"}}},"label":"\"}]}}],"listeners":{}}',
                    uiStateJSON: '{"spy":{"mode":{"fill":false,"name":"table"}}}',
                    description: '',
                    version: 1,
                    kibanaSavedObjectMeta: {
                        searchSourceJSON: '{"index":"thomaskilmann-' + activityId + '","query":{"match_all":{}},"filter":[]}'
                    }
                }, {
                    title: 'NUMBER OF GAMES SHIPPED',
                    visState: '{"title":"NUMBER OF GAMES SHIPPED","type":"badges-vis","params":{"imageUrl":"https://github.com/e-ucm/badges-vis/raw/master/images/badges/tick_green.png","text":"NUMBER OF GAMES SHIPPED","value":"0","division":false,"numeralFormat":"[{ \\\"numeralFormat\\\" : \\\"000\\\" }]","type":"badges-vis","useNumerator":false},"aggs":[{"id":"1","enabled":true,"type":"count","schema":"metric","params":{}},{"id":"2","enabled":true,"type":"filters","schema":"buckets","params":{"filters":[{"input":{"query":{"query_string":{"query":"out.ext.shippedGame:*"}}},"label":"\"}]}}],"listeners":{}}',
                    uiStateJSON: '{"spy":{"mode":{"name":null,"fill":false}}}',
                    description: '',
                    version: 1,
                    kibanaSavedObjectMeta: {
                        searchSourceJSON: '{"index":"thomaskilmann-' + activityId + '","query":{"match_all":{}},"filter":[]}'
                    }
                }, {
                    title: 'NUMBER OF AWARDS WON',
                    visState: '{"title":"NUMBER OF AWARDS WON","type":"badges-vis","params":{"imageUrl":"https://github.com/e-ucm/badges-vis/raw/master/images/badges/trophy_acchievement.png","text":"NUMBER OF AWARDS WON","value":"0","division":false,"numeralFormat":"[{ \\\"numeralFormat\\\" : \\\"000\\\" }]","type":"badges-vis","useNumerator":false},"aggs":[{"id":"1","enabled":true,"type":"count","schema":"metric","params":{}},{"id":"2","enabled":true,"type":"filters","schema":"buckets","params":{"filters":[{"input":{"query":{"query_string":{"query":"out.ext.award:*"}}},"label":"\"}]}}],"listeners":{}}',
                    uiStateJSON: '{"spy":{"mode":{"name":null,"fill":false}}}',
                    description: '',
                    version: 1,
                    kibanaSavedObjectMeta: {
                        searchSourceJSON: '{"index":"thomaskilmann-' + activityId + '","query":{"match_all":{}},"filter":[]}'
                    }
                }, {
                    title: 'ThomasKilmann Classification',
                    visState: '{"title":"ThomasKilmann Classification","type":"tkWidget","params":{"color1":"#1f77b4","color2":"#ff7f0e","color3":"#2ca02c","color4":"#d62728","color5":"#9467bd","legend_position":"right","type":"tkWidget"},"aggs":[{"id":"1","enabled":true,"type":"count","schema":"metric","params":{}},{"id":"2","enabled":true,"type":"terms","schema":"buckets","params":{"field":"out.ext.thomasKilmann.keyword","size":5,"order":"desc","orderBy":"1"}}],"listeners":{}}',
                    uiStateJSON: '{"spy":{"mode":{"name":null,"fill":false}}}',
                    description: '',
                    version: 1,
                    kibanaSavedObjectMeta: {
                        searchSourceJSON: '{"index":"thomaskilmann-' + activityId + '","query":{"match_all":{}},"filter":[]}'
                    }
                }, {
                    title: 'ThomasKilmann Piechart',
                    visState: '{"title":"ThomasKilmann Piechart","type":"pie","params":{"addTooltip":true,"addLegend":true,"legendPosition":"right","isDonut":false,"type":"pie"},"aggs":[{"id":"1","enabled":true,"type":"count","schema":"metric","params":{}},{"id":"2","enabled":true,"type":"terms","schema":"segment","params":{"field":"out.ext.thomasKilmann.keyword","size":5,"order":"desc","orderBy":"1"}}],"listeners":{}}',
                    uiStateJSON: '{}',
                    description: '',
                    version: 1,
                    kibanaSavedObjectMeta: {
                        searchSourceJSON: '{"index":"thomaskilmann-' + activityId + '","query":{"match_all":{}},"filter":[]}'
                    }
                }, {
                    title: 'DESCRIPTION',
                    visState: '{"title":"DESCRIPTION","type":"markdown","params":{"type":"markdown","markdown":"# Et aequent vestem bracchiaque ante inrita hic\\n\\n## Quae deum vultum Dardanio luminis vestigia\\n\\nLorem markdownum locum unguibus *virum*. Potest indigenis Cyllare illis accepta\\nutque, est et fulgebant vocat, cur mota cur; malum. Erit inquit, addere? Pondera\\nalas pater de conparentis plenos, et Icare, [fide](http://arsuris-senis.org/).\\n\\n> Nec viva squamis tecta, aures fiducia nigrescere mittere at amens ille alasque\\n> **saepe**, dent animam currus Turno? Coniunx cape. Eburnea eandem cura patris:\\n> et deserit inposito traxere figurae, terrae corpus. Dapibus arvum vigili\\n> **Iuppiter** aegro paulumque cura?\\n\\n## Plerumque albentia defendit vetat Rhodopen laetabere et\\n\\nLibratus modo his ver paratibus ego per flentes succeditis aetas. Nunc nulli\\nfessusque et tibi, mihi repperit ope membra eburnea sua\\n[orandus](http://uno-tegitur.io/quam). Illic manibus, tu neque ursaque, intus.\\nNate exemplum?\\n\\n    var video_autoresponder = snapshot(bitSoap, remote_target_cloud) +\\n            smtp_gpu_frame(bookmark_pitch_encryption, 990982) / outbox(samba,\\n            flash(ipv_data_smb, repeater), sound_recycle_trim -\\n            lteVirusMnemonic);\\n    var constant_dual = paste_flash_window(user, soap_cluster_server(\\n            disk_menu));\\n    if (backsideComputerMaster) {\\n        serialBig += -3;\\n        jsf_minimize(1, whiteMenuFlaming, graphicsPcb);\\n        interface(-2 / 1);\\n    }\\n    if (truncateSd / cyberspace > addressGpsOffline.software(3, dbmsPointLamp,\\n            sramCtp)) {\\n        reciprocal_rpc_linux.cycle(sprite(76, 5), vector, signature);\\n        cdn_internet_pixel.networking_character *= siteBluLag;\\n    } else {\\n        ajaxBoot = paste_google_disk(ramHalfNull * station, table + olap_point,\\n                user + adc);\\n    }\\n\\nHerbas nec quoque, venit spectent **potuisset Argolicas** incumbens utinam,\\nconclamat miserata ilice dubites propulit. Ab nequeo caelicolae Erycina currus,\\nmalo dea primae bucina gradibus, Troiae Nabataeus. Fortuna umquam semina\\nconlaudat coniunx et contra deae Priamo prosilit filia: ordine forti, nunc,\\nvirgo!\\n\\n## Adiecerit animalia\\n\\nCastra creatum, accedat, tale quo glaebam: partu ut sim circumspice\\n[tamen](http://fores.net/pugnaemihi). Per invitum animata et illis cernitis\\nPirithoi rapite fluctus; **non adest** fecit multa furta? Vale muneris: ego\\nCoronida mansit!\\n\\n1. Umbras quam duorum\\n2. Iterum fratrem temptat ferula\\n3. Viris in quodsi formam ipsos tange rogari\\n\\nDuo **esse ubi aprum**! Una [motaque dixere](http://molitorlacus.io/carens),\\nOetaeus musco animus contrahitur pascua, simulacraque plura mea est collo\\nnatorum in.\\n\\n**Fallit postquam** molles mirabatur et remos cupiunt premebat [celebrare\\nutraque](http://seque.io/sinistra) lingua post. Profanus attonitos Tereu, vestes\\ntauri solidum validum quisquis victa, Peleusque in ille. Videtur **decrescunt\\ncrura** Tirynthius ripa auxiliaria sentit spectare fuerat, Ciconumque."},"aggs":[],"listeners":{}}',
                    uiStateJSON: '{}',
                    description: '',
                    version: 1,
                    kibanaSavedObjectMeta: {
                        searchSourceJSON: '{"query":{"match_all":{}},"filter":[]}'
                    }
                }, {
                    title: 'Biases Percentage',
                    visState: '{"title":"Biases Percentage","type":"histogram","params":{"grid":{"categoryLines":false,"style":{"color":"#eee"}},"categoryAxes":[{"id":"CategoryAxis-1","type":"category","position":"bottom","show":true,"style":{},"scale":{"type":"linear"},"labels":{"show":true,"truncate":100},"title":{"text":"bias_type.keyword: Descending"}}],"valueAxes":[{"id":"ValueAxis-1","name":"LeftAxis-1","type":"value","position":"left","show":true,"style":{},"scale":{"type":"linear","mode":"normal"},"labels":{"show":true,"rotate":0,"filter":false,"truncate":100},"title":{"text":"Count"}}],"seriesParams":[{"show":"true","type":"histogram","mode":"stacked","data":{"label":"Count","id":"1"},"valueAxis":"ValueAxis-1","drawLinesBetweenPoints":true,"showCircles":true}],"addTooltip":true,"addLegend":true,"legendPosition":"right","times":[],"addTimeMarker":false,"type":"histogram"},"aggs":[{"id":"1","enabled":true,"type":"count","schema":"metric","params":{}},{"id":"2","enabled":true,"type":"terms","schema":"segment","params":{"field":"bias_type.keyword","size":5,"order":"desc","orderBy":"1"}},{"id":"3","enabled":true,"type":"filters","schema":"group","params":{"filters":[{"input":{"query":{"query_string":{"query":"bias_value_false:1"}}},"label":"False"},{"input":{"query":{"query_string":{"query":"bias_value_true:1"}}},"label":".True"}]}}],"listeners":{}}',
                    uiStateJSON: '{}',
                    description: '',
                    version: 1,
                    kibanaSavedObjectMeta: {
                        searchSourceJSON: '{"index":"thomaskilmann-' + activityId + '","query":{"match_all":{}},"filter":[]}'
                    }
                }, {
                    title: 'Thomas Kilmann Over Time!',
                    visState: '{"title":"Thomas Kilmann Over Time!","type":"prelert_swimlane","params":{"interval":{"display":"Auto","val":"auto"},"lowThreshold":0,"warningThreshold":1,"minorThreshold":2,"majorThreshold":3,"criticalThreshold":4,"lowThresholdColor":"#d2e9f7","warningThresholdColor":"#8bc8fb","minorThresholdColor":"#ffdd00","majorThresholdColor":"#ff7e00","criticalThresholdColor":"#fe5050","tooltipNumberFormat":"0.0","showLegend":true,"alphabetSortLaneLabels":"off","type":"prelert_swimlane"},"aggs":[{"id":"1","enabled":true,"type":"max","schema":"metric","params":{"field":"tkscripted"}},{"id":"2","enabled":true,"type":"terms","schema":"viewBy","params":{"field":"out.ext.thomasKilmann.keyword","size":10,"order":"desc","orderBy":"1"}},{"id":"3","enabled":true,"type":"date_histogram","schema":"timeSplit","params":{"field":"out.timestamp","interval":"auto","customInterval":"2h","min_doc_count":1,"extended_bounds":{}}}],"listeners":{}}',
                    uiStateJSON: '{}',
                    description: '',
                    version: 1,
                    kibanaSavedObjectMeta: {
                        searchSourceJSON: '{"index":"thomaskilmann-' + activityId + '","query":{"match_all":{}},"filter":[]}'
                    }
                }];

                // DASHBOARD
                var dashboard = {
                    title: 'Hulldashboard_' + activityId,
                    hits: 0,
                    description: '',
                    panelsJSON: '[{"col":1,"id":"' + viauslizationIds[0] + '","panelIndex":1,"row":6,"size_x":5,"size_y":1,"type":"visualization"},{"col":1,"id":"' + viauslizationIds[1] + '","panelIndex":2,"row":4,"size_x":5,"size_y":1,"type":"visualization"},{"col":1,"id":"' + viauslizationIds[2] + '","panelIndex":3,"row":5,"size_x":5,"size_y":1,"type":"visualization"},{"col":1,"id":"' + viauslizationIds[3] + '","panelIndex":4,"row":7,"size_x":5,"size_y":3,"type":"visualization"},{"col":1,"id":"' + viauslizationIds[4] + '","panelIndex":5,"row":10,"size_x":5,"size_y":3,"type":"visualization"},{"col":6,"id":"' + viauslizationIds[5] + '","panelIndex":6,"row":4,"size_x":7,"size_y":13,"type":"visualization"},{"col":1,"id":"' + viauslizationIds[6] + '","panelIndex":7,"row":13,"size_x":5,"size_y":4,"type":"visualization"},{"col":1,"id":"' + viauslizationIds[7] + '","panelIndex":8,"row":1,"size_x":12,"size_y":3,"type":"visualization"}]',
                    optionsJSON: '{"darkTheme":false}',
                    uiStateJSON: '{"P-1":{"spy":{"mode":{"fill":false,"name":null}}},"P-5":{"spy":{"mode":{"fill":false,"name":null}},"vis":{"legendOpen":true}}}',
                    version: 1,
                    timeRestore: true,
                    timeTo: 'Tue Feb 14 2017 09:37:43 GMT+0100',
                    timeFrom: 'Tue Feb 14 2017 09:23:41 GMT+0100',
                    refreshInterval: {
                        display: 'Off',
                        pause: false,
                        value: 0
                    },
                    kibanaSavedObjectMeta: {
                        searchSourceJSON: '{"filter":[{"query":{"match_all":{}}}],"highlightAll":true,"version":true}'
                    }
                };

                //jscs:enable maximumLineLength

                $http.post(CONSTANTS.PROXY + '/kibana/hulldata/' + activityId, {
                    dashboard: dashboard,
                    visualizations: visualizations,
                    visualizationsIds: viauslizationIds
                })
                    .success(function (data) {
                        console.log('Finished creating dashboard!');
                    }).error(function (data, status) {
                    console.error('Error on post /kibana/hulldata/' + activityId + ' ' +
                        JSON.stringify(data) + ', status: ' + status);
                });
            };

            var refresh;
            var onSetActivity = function () {
                $scope.refreshResults = function () {
                    var rawResults = Results.query({
                            id: $scope.activity._id
                        },
                        function () {
                            calculateResults(rawResults);
                        });
                };

                if (!$attrs.lite) {
                    $scope.iframeDashboardUrl = dashboardLink();
                    $scope.studentIframe = dashboardLink($scope.$storage.user.username);

                    $scope.version = Versions.get({
                        gameId: $scope.activity.gameId,
                        versionId: $scope.activity.versionId
                    }, function () {
                        $scope.refreshResults();
                        if (!$scope.activity.end) {
                            refresh = $interval(function () {
                                $scope.refreshResults();
                            }, 10000);
                        }
                    });
                }
            };

            $scope.$on('$destroy', function () {
                if (refresh) {
                    $interval.cancel(refresh);
                }
            });

            $attrs.$observe('activityid', function () {
                $scope.activity = Activities.get({activityId: $attrs.activityid}, onSetActivity);
                init();
            });

            $attrs.$observe('activity', function () {
                $scope.activity = JSON.parse($attrs.activity);
                Activities.get({activityId: $scope.activity._id}).$promise.then(function (a) {
                    $scope.activity = a;
                });

                onSetActivity();
            });

            $scope.student = {};
            $scope.teacher = {};


            var evalExpression = function (expression, defaultValue) {
                try {
                    return eval(expression) || defaultValue;
                } catch (err) {
                    return defaultValue;
                }
            };


            var dashboardLink = function (userName) {
                var url = CONSTANTS.KIBANA + '/app/kibana#/dashboard/dashboard_tk_' +
                    $scope.activity._id + '?embed=true_g=(refreshInterval:(display:\'5%20seconds\',' +
                    'pause:!f,section:1,value:5000),time:(from:now-1h,mode:quick,to:now))';
                if (url.startsWith('localhost')) {
                    url = 'http://' + url;
                }

                if (userName) {
                    url += '&_a=(filters:!(),options:(darkTheme:!f),query:(query_string:(analyze_wildcard:!t,query:\'name:' +
                        userName + '\')))';
                } else if ($scope.player) {
                    url += '&_a=(filters:!(),options:(darkTheme:!f),query:(query_string:(analyze_wildcard:!t,query:\'name:' +
                        $scope.player.name + '\')))';
                }

                if (url.startsWith('localhost')) {
                    url = 'http://' + url;
                }

                return $sce.trustAsResourceUrl(url);
            };

            var calculateResults = function (rawResults) {
                var results = [];
                rawResults.forEach(function (result) {
                    $scope.version.alias = $scope.version.alias ? $scope.version.alias : 'this.name';
                    result.name = evalExpression.call(result, $scope.version.alias, 'Unknown');

                    result.warnings = [];
                    for (var i = 0; $scope.version.warnings && i < $scope.version.warnings.length; i++) {
                        var warning = $scope.version.warnings[i];
                        if (evalExpression.call(result, warning.cond, false)) {
                            result.warnings.push(i);
                        }
                    }

                    result.alerts = [];
                    for (i = 0; $scope.version.alerts && i < $scope.version.alerts.length; i++) {
                        var alert = $scope.version.alerts[i];
                        var level = evalExpression.call(result, alert.value, 0);
                        if (level - ((result.levels && result.levels[i]) || 0) >= alert.maxDiff) {
                            result.alerts.push({
                                id: i,
                                level: level
                            });
                        }
                    }
                    results.push(result);

                    if ($scope.player && $scope.player._id === result._id) {
                        $scope.player = result;
                    }

                });

                $scope.results = results;
            };

            $scope.viewAll = function () {
                $scope.player = null;
                $scope.iframeDashboardUrl = dashboardLink();
            };

            $scope.viewPlayer = function (result) {
                $scope.player = result;
                $scope.iframeDashboardUrl = dashboardLink();
            };

            // Anonymous

            $scope.anonymous = 'btn-default';

            $scope.allowAnonymous = function () {
                $scope.activity.$update();
            };

            // Teachers

            $scope.isRemovable = function (dev) {
                var teachers = $scope.activity.teachers;
                if (teachers && teachers.length === 1) {
                    return false;
                }
                if ($scope.username === dev) {
                    return false;
                }
                return true;
            };

            $scope.inviteTeacher = function () {
                if ($scope.teacher.name && $scope.teacher.name.trim() !== '') {
                    $scope.activity.teachers.push($scope.teacher.name);
                    $scope.activity.$update(function () {
                        $scope.teacher.name = '';
                    });
                }
            };

            $scope.ejectTeacher = function (teacher) {
                var route = CONSTANTS.PROXY + '/activities/' + $scope.activity._id + '/remove';
                $http.put(route, {teachers: teacher}).success(function (data) {
                    $scope.activity.teachers = data.teachers;
                }).error(function (data, status) {
                    console.error('Error on put' + route + ' ' +
                        JSON.stringify(data) + ', status: ' + status);
                });
            };

            // Students

            $scope.inviteStudent = function () {
                if ($scope.student.name && $scope.student.name.trim() !== '') {
                    var route = CONSTANTS.PROXY + '/activities/' + $scope.activity._id;
                    $http.put(route, {students: $scope.student.name}).success(function (data) {
                        $scope.student.name = '';
                        $scope.activity.students = data.students;
                    }).error(function (data, status) {
                        console.error('Error on put' + route + ' ' +
                            JSON.stringify(data) + ', status: ' + status);
                    });
                }

            };

            $scope.ejectStudent = function (student) {
                var route = CONSTANTS.PROXY + '/activities/' + $scope.activity._id + '/remove';
                $http.put(route, {students: student}).success(function (data) {
                    $scope.activity.students = data.students;
                }).error(function (data, status) {
                    console.error('Error on put' + route + ' ' +
                        JSON.stringify(data) + ', status: ' + status);
                });
            };

            $scope.updateActivityToClass = function () {
                Classes.get({classId: $scope.activity.classId}).$promise.then(function (c) {
                    angular.extend($scope.activity.students, c.students);
                    $scope.activity.$update();
                });
            };

            $scope.resetActivityToClass = function () {

                Classes.get({classId: $scope.activity.classId}).$promise.then(function (c) {

                    var toRemove = _.difference($scope.activity.students, c.students);
                    $scope.activity.students = _.intersection($scope.activity.students, c.students);
                    var then = function () {
                        angular.extend($scope.activity.students, c.students);
                        $scope.activity.$update();
                    };
                    if (toRemove.length > 0) {
                        removeStudentsFromActivity(toRemove, then);
                    } else {
                        then();
                    }
                });
            };

            var removeStudentsFromActivity = function (students, then) {
                if (students.length > 0) {
                    var route = CONSTANTS.PROXY + '/activities/' + $scope.activity._id + '/remove';
                    $http.put(route, {students: students}).success(function (data) {
                        $scope.activity.students = data.students;
                        then();
                    }).error(function (data, status) {
                        console.error('Error on put' + route + ' ' +
                            JSON.stringify(data) + ', status: ' + status);
                    });
                }
            };

            $scope.addCsvActivity = function () {
                var students = [];
                $scope.fileContent.contents.trim().split(',').forEach(function (student) {
                    if (student) {
                        students.push(student);
                    }
                });
                var route = CONSTANTS.PROXY + '/activities/' + $scope.activity._id;
                $http.put(route, {students: students}).success(function (data) {
                    $scope.activity.students = data.students;
                }).error(function (data, status) {
                    console.error('Error on put', route, status);
                });
            };


            // Name

            $scope.changeActivityName = function () {
                $scope.activity.$update(function () {
                    $rootScope.$broadcast('refreshClasses');
                });
            };

            // Realtime control

            /**
             * ActivityState returns the state of the activity from one of the next possible states:
             *  - 0: Stopped
             *  - 1: Loading
             *  - 2: Open
             *
             * @param activity
             * @returns {*|boolean}
             */
            $scope.activityState = function () {
                if (!$scope.activity || $scope.activity.loading) {
                    return 1;
                }

                return $scope.activity.start && !$scope.activity.end ? 2 : 0;
            };

            $scope.$on('refreshActivity', function (evt, activity) {
                $scope.activity = activity;
                console.log('Activity updated');
            });

            $scope.startActivity = function () {
                if (!$scope.activity || $scope.activity.loading) {
                    return;
                }

                $scope.activity.loading = true;
                $http.post(CONSTANTS.PROXY + '/activities/' + $scope.activity._id + '/event/start').success(function (s) {
                    $scope.activity.loading = false;
                    $scope.activity.start = s.start;
                    $scope.activity.end = s.end;
                    $rootScope.$broadcast('refreshActivity', $scope.activity);
                }).error(function (data, status) {
                    console.error('Error on get /activities/' + $scope.activity._id + '/event/start ' +
                        JSON.stringify(data) + ', status: ' + status);

                    $.notify('<strong>Error while opening the activity:</strong><br>If the session was recently closed it ' +
                        'might need to be cleaned by the system. <br>Please try again in a few seconds.', {
                        offset: {x: 10, y: 65},
                        type: 'danger'// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
                    });

                    $scope.activity.loading = false;
                    $rootScope.$broadcast('refreshActivity', $scope.activity);
                });
            };

            $scope.endActivity = function () {
                if (!$scope.activity || $scope.activity.loading) {
                    return;
                }

                $scope.activity.loading = true;
                $http.post(CONSTANTS.PROXY + '/activities/' + $scope.activity._id + '/event/end').success(function (s) {
                    $scope.activity.loading = false;
                    $scope.activity.start = s.start;
                    $scope.activity.end = s.end;
                    $rootScope.$broadcast('refreshActivity', $scope.activity);
                }).error(function (data, status) {
                    console.error('Error on get /activities/' + $scope.activity._id + '/event/end ' +
                        JSON.stringify(data) + ', status: ' + status);

                    $.notify('<strong>Error while closing the activity:</strong><br>Please try again in a few seconds.', {
                        offset: {x: 10, y: 65},
                        type: 'danger'// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
                    });

                    $scope.activity.loading = false;
                    $rootScope.$broadcast('refreshActivity', $scope.activity);
                });
            };

            $scope.$watch('iframeDashboardUrl', function (newValue, oldValue) {
                var iframeObj = document.getElementById('dashboardIframe');
                if (iframeObj) {
                    iframeObj.src = newValue;
                    iframeObj.contentWindow.location.reload();
                }
            });

            $scope.$watch('studentIframe', function (newValue, oldValue) {
                var iframeObj = document.getElementById('dashboardIframeStudent');
                if (iframeObj) {
                    iframeObj.src = newValue;
                    iframeObj.contentWindow.location.reload();
                }
            });

            $scope.updateLevels = function (player) {
                var levels = player.levels || [];

                player.alerts.forEach(function (alert) {
                    levels[alert.id] = alert.level;
                });
                delete player.alerts;
                player.levels = levels;
                player.$save({id: $scope.activity._id}, function () {
                    $scope.player = null;
                    $scope.refreshResults();
                });
            };

            $scope.deleteUserData = function (name) {
                $http.delete(CONSTANTS.PROXY + '/activities/data/' + $scope.activity._id + '/' + name).success(function () {
                }).error(function (err) {
                    console.error(err);
                });
            };
        }
    ]);