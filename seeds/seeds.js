var faker = require('faker');
var voca = require('voca');
const MULTIPLIER = 1;

function randomTitle(type) {
    type = voca.titleCase(type);
    var randomWord = faker.random.word();
    randomWord = voca.titleCase(randomWord);
    var names = [
        `The ${ randomWord } Inn`,
        `${ type } ${ randomWord }`,
        `${ randomWord } ${ type }`
    ];
    var index = Math.floor(Math.random() * names.length);
    return names[index];
}
module.exports = () => {





    // ----------------------------------------
    // Create Users
    // ----------------------------------------
    console.log('Creating Users');
    var users = [];
    for (let i = 0; i < MULTIPLIER * 2; i++) {
        var user = new User({
            firstName: 'Foo',
            lastName: 'Bar',
            username: `foobar${ i }`,
            email: `foobar${ i }@gmail.com`
        });
        users.push(user);
    }


    var posts = [];
    for (let i = 0; i < MULTIPLIER * 2; i++) {
        var user = new Post({
            title: randomTitle('books'),
            body: randomTitle('books'),
            author: User.getRandomId();
        });
        users.push(user);
    }


    // Seed other models...


    // ----------------------------------------
    // Finish
    // ----------------------------------------
    console.log('Saving...');
    var promises = [];
    [
        users,
        // Other models...
    ].forEach((collection) => {
        collection.forEach((model) => {
            promises.push(model.save());
        });
    });
    return Promise.all(promises);
};
