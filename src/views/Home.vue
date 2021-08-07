<template>
	<div class="home">
		<div class="row">
			<div class="col">
				<Calendar id="calendar01" width="500" :bg="season" />
			</div>
		</div>
		<div class="row">
			<div class="col">
				<Calendar id="calendar02" width="500" :position="true" />
			</div>
		</div>
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
	.row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
}
</style>
