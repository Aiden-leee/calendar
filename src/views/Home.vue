<template>
	<div class="home"><Calendar width="500" lang="en" /></div>
</template>
<script>
import Calendar from '@/components/Calendar.vue';
export default {
	name: 'Home',
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
