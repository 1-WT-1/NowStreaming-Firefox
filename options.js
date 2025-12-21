$(document).ready(function () {
	$("#notifications").bind("click", check_notifications);
	$("#checkadd").bind("click", check_sync);
	$("#checkreplace").bind("click", check_sync);
});

document.addEventListener('DOMContentLoaded', restore_options);

function restore_options() {
	// Use default value color = 'red' and likesColor = true.
	browser.storage.local.get({
		notifications: true,
		add: true,
		sgdb_key: '',
		iconCache: {}
	}, function (items) {
		document.getElementById('notifications').checked = items.notifications;
		document.getElementById('checkadd').checked = items.add;
		document.getElementById('checkreplace').checked = !(items.add);

		/* Theme */
		$("#themeArea").on({
			click: function () {
				changeTheme();
			}
		});

		/* SGDB Settings */
		$("#saveSgdbKey").on({
			click: function () {
				var key = $("#sgdbKeyInput").val().trim();
				browser.storage.local.set({ sgdb_key: key }, function () {
					$("#sgdbKeyInput").val(key);
				});
			}
		});

		$("#clearIconCache").on({
			click: function () {
				browser.storage.local.set({ iconCache: {} }, function () {
					location.reload();
				});
			}
		});

		$("#sgdbKeyInput").val(items.sgdb_key);
	});
}

function check_notifications() {
	if (document.getElementById("notifications").checked) {
		browser.storage.local.set({ 'notifications': true }, function () { });
	}
	else {
		browser.storage.local.set({ 'notifications': false }, function () { });
	}
}

function check_sync() {
	if (document.getElementById("checkadd").checked) {
		browser.storage.local.set({ add: true }, function () { });
	}
	else {
		browser.storage.local.set({ add: false }, function () { });
	}
}