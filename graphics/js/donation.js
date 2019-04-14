'use strict';
$(() => {
	const speedcontrolBundle = 'speedcontrol-tiltify';

	const donation = nodecg.Replicant('donationTotal', speedcontrolBundle);
	donation.on('change', newVal => {
		if (newVal || newVal === 0) {
			updateDonationBar(newVal);
		}
	});

	function updateDonationBar(newVal) {
		$('.donationTotal').html(formatDonation(newVal));
	}

	function formatDonation(total) {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);
	}
});
