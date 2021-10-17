var ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/gulfaraz/alignment-tracker.git',
        user: {
            name: 'Gulfaraz Rahman',
            email: 'gulfarazyasin@gmail.com',
        },
    },
    () => {
        console.log('Deploy Complete!');
    }
);
