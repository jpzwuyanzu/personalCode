const paths=require('react-scripts/config/paths')
const path = require('path')

paths.appBuild=path.json(path.dirname(paths.appBuild),'dist')