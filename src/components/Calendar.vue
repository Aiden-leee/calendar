<template>
	<article id="calendar" class="calendar" :style="{ width: width + 'px' }">
		<div class="wrap">
			<header>
				<div class="current-date">
					<div class="current-year">{{ currentDate.year }}</div>
					<div class="current-month">{{ currentDate.month }}</div>
					<div class="current-day">{{ calendarLanguage[currentDay] }}</div>
				</div>
			</header>
			<section>
				<div class="week-days">
					<template v-for="(day, index) in calendarLanguage">
						<div :key="index" class="week-day">{{ day }}</div>
					</template>
				</div>
				<div class="dates">
					<div class="date hidden-date">29</div>
					<div class="date hidden-date">30</div>
					<div class="date hidden-date">31</div>
					<template v-for="(n, index) in currentMonthDate">
						<div :key="index" class="date">{{ n }}</div>
					</template>
				</div>
			</section>
		</div>
	</article>
</template>

<script>
export default {
	props: {
		width: {
			default: '400',
		},
		lang: {
			default: 'ko',
		},
	},
	data() {
		return {
			weekDays: {
				ko: ['월', '화', '수', '목', '금', '토', '일'],
				en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			},
			month: {
				en: [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December',
				],
			},
			currentDate: {
				date: 0,
				month: 0,
				year: 0,
			},
		};
	},
	computed: {
		// 언어 설정
		calendarLanguage() {
			return this.weekDays[this.lang != 'en' ? 'ko' : 'en'];
		},
		// 현재 요일
		currentDay() {
			let { date, month, year } = this.currentDate;
			return new Date(year, month, date).getDay();
		},
		// 현재 달의 요일 수
		currentMonthDate() {
			let { month, year } = this.currentDate;
			return new Date(year, month + 1, 0).getDate();
		},
	},
	created() {
		this.getCurrentDate();
	},
	methods: {
		getCurrentDate() {
			let today = new Date();
			this.currentDate.date = today.getDate();
			this.currentDate.month = today.getMonth();
			this.currentDate.year = today.getFullYear();
		},
	},
};
</script>

<style lang="scss" scoped>
@mixin clearBoth {
	&:after {
		content: '';
		display: block;
		clear: both;
	}
}
#calendar {
	margin: 0 auto;
	min-width: 400px;
	border: 1px solid #aeaeae;
	border-radius: 12px;
	.wrap {
		padding: 12px 15px;
		> header {
			text-align: center;
			height: 200px;
			.current-date {
				.current-year {
					font-size: 30px;
					font-weight: bold;
				}
				.current-month {
					font-size: 24px;
					font-weight: bold;
					margin-top: 10px;
				}
			}
		}
		> section {
			// background: rgba(0, 0, 0, 0.5);
			.week-days {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(14%, auto));
				> .week-day {
					text-align: center;
					padding: 10px 0;
					color: #000;
					font-weight: bold;
				}
			}
			.dates {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(14%, auto));
				row-gap: 10px;
				.date {
					// width: 14%;
					padding: 10px 0;
					text-align: center;
					cursor: pointer;
					&:not(.hidden-date):hover {
						background: #ccc;
					}
					&.hidden-date {
						color: #ccc;
					}
				}
			}
		}
	}
}
</style>
