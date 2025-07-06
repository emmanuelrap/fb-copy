const getTimeAgo = (dateString) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffMs = now - date;
	const diffMins = Math.floor(diffMs / (1000 * 60));

	if (diffMins < 60) {
		return `${diffMins}min`;
	}

	const diffHours = Math.floor(diffMins / 60);
	if (diffHours < 24) {
		return `${diffHours}h`;
	}

	const diffDays = Math.floor(diffHours / 24);
	if (diffDays < 7) {
		return `${diffDays}d`;
	}

	const diffWeeks = Math.floor(diffDays / 7);
	if (diffWeeks < 4) {
		return `${diffWeeks}w`;
	}

	const diffMonths = Math.floor(diffDays / 30);
	if (diffMonths < 12) {
		return `${diffMonths}m`;
	}

	const diffYears = Math.floor(diffDays / 365);
	return `${diffYears}y`;
};
