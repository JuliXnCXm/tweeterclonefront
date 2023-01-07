const server = "https://tweeterbackend.herokuapp.com//";
const apiLogin = `${server}api/auth/login`;
const serverUser = `${server}api/users`;
const apiRegister = `${server}api/auth/register`;
const apiDelete = `${server}api/users/delete`;
const apiFollows =  `${server}api/follows`
const apiTweets =  `${server}api/tweets`
const apiMedia =  `${server}api/media`

module.exports = {
    server,
    apiLogin,
    apiRegister,
    serverUser,
    apiDelete,
    apiFollows,
    apiTweets,
    apiMedia
};
