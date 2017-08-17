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
    for (let i = 1; i < MULTIPLIER * 10; i++) {
        var user = new User({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: faker.random.word(),
            email: faker.internet.email()
        });
        users.push(user);
    }

    // ----------------------------------------
    // Create Posts
    // ----------------------------------------
    console.log('Creating Posts');
    var posts = [];
    for (let i = 1; i < MULTIPLIER * 50; i++) {
        var author = users[Math.floor(Math.random() * users.length)]
        var post = new Post({
            title: randomTitle('books'),
            body: randomTitle('books'),
            author: author._id,
            score: Math.floor(Math.random()*100)
        });
        posts.push(post);
    }

    // ----------------------------------------
    // Create Comments
    // ----------------------------------------
    console.log('Creating Comments');
    var comments = [];
    for (let i = 1; i < MULTIPLIER * 50; i++) {
        let author = users[Math.floor(Math.random() * users.length)];
        let post = posts[Math.floor(Math.random() * posts.length)];
        var comment = new Comment({
            title: randomTitle('books'),
            body: randomTitle('books'),
            author: author._id,
            parent: post._id,
            score: Math.floor(Math.random()*100)
        });
        post.comments.push(comment);
        comments.push(comment);
    }

    // ----------------------------------------
    // Finish
    // ----------------------------------------
    console.log('Saving...');

    var promises = [];
    [
        users,
        posts,
        comments
    ].forEach((collection) => {
        collection.forEach((model) => {
            promises.push(model.save());
        });
    });
    return Promise.all(promises);
};
