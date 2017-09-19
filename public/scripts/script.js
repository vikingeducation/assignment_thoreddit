$(document).ready(function() {
	$('#commentContainer').on('click', 'a', function(e) {
		let $target = $(e.target);
		let url = $target.prop('href');
		e.preventDefault();

		$.ajax(url, {}).done(function(body) {
			let $parent = $target.parent();
			$parent.html(body);
		});
	});
});
