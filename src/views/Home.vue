<template>
	<div class="home">
		<Calendar width="500" :bg="season" />
	</div>
</template>
<script>
import Calendar from '@/components/Calendar.vue';
export default {
	name: 'Home',
	data() {
		return {
			season: [
				'january.png',
				'february.png',
				'march.png',
				'april.png',
				'may.png',
				'june.png',
				'july.png',
				'august.png',
				'september.png',
				'october.png',
				'november.png',
				'december.png',
			],
		};
	},
	components: {
		Calendar,
	},
};
</script>
<style lang="scss">
.home {
	padding: 10px;
}
</style>
