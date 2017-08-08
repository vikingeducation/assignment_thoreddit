module.exports = {
	commentsPath: () => "/comments",
	commentPath: id => `/comments/${id}`,
	newCommentPath: () => "/comments/new",
	editCommentPath: id => `/comments/${id}/edit`,
	destroyCommentPath: id => `/comments/${id}/?_method=delete`
};
