/* Get Homepage */
module.exports.index = function(req, res) {
    res.render('index', { title: 'Fitness App' });
}

module.exports.create = function(req, res){
    res.render('create', { title: 'Create a New Program' });
}