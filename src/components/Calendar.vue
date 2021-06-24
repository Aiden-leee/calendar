<template>
	<article
		id="calendar"
		class="calendar"
		:style="{
			width: width + 'px',
			backgroundImage: `url(${currentBgImage})`,
		}"
	>
		<div class="wrap" :class="{ bg: currentBgImage }">
			<header>
				<div class="current-date">
					<div class="current-year">{{ currentDate.year }}</div>
					<div class="current-month">
						<i class="arrow prev" @click="prevMonth()">prev</i>
						{{ currentMonth }}
						<i class="arrow next" @click="nextMonth()">next</i>
					</div>
				</div>
			</header>
			<section>
				<div class="week-days">
					<template v-for="(day, index) in calendarLanguage">
						<div :key="index" class="week-day">{{ day }}</div>
					</template>
				</div>
				<div class="dates">
					<template v-for="(n, index) in firstMonthDay - 1">
						<div :key="'prev' + index" class="date hidden-date">
							<span>{{ prevMonthDate + 1 - n }}</span>
						</div>
					</template>
					<template v-for="(n, index) in currentMonthDate">
						<div
							:key="index"
							class="date"
							:class="{ active: n == currentDate.date }"
							@click="currentDate.date = n"
						>
							<span>{{ n }}</span>
						</div>
					</template>
					<template
						v-for="(n, index) in 43 - (currentMonthDate + firstMonthDay)"
					>
						<div :key="'next' + index" class="date hidden-date">
							<span>{{ n }}</span>
						</div>
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
		bg: {
			type: Array,
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
			let { year, month, date } = this.currentDate;
			return new Date(year, month, date).getDay();
		},
		// 현재 달의 요일 수
		currentMonthDate() {
			let { month, year } = this.currentDate;
			return new Date(year, month + 1, 0).getDate();
		},
		// 현재 월
		currentMonth() {
			if (this.lang != 'en') {
				return this.currentDate.month + 1 + '월';
			} else {
				return this.month.en[this.currentDate.month];
			}
		},
		// 배경 이미지
		currentBgImage() {
			let { month } = this.currentDate;
			return require('@/assets/' + this.bg[month]);
		},
		// 이전 달 마지막 일
		prevMonthDate() {
			let { year, month } = this.currentDate;
			let y = month == 0 ? year - 1 : year;
			let m = month == 0 ? 12 : month;
			return new Date(y, m, 0).getDate();
		},
		// 현재 날짜 1일의 요일
		firstMonthDay() {
			let { year, month } = this.currentDate;
			let firstDay = new Date(year, month, 1).getDay();
			if (firstDay == 0) firstDay = 7;
			return firstDay;
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
		prevMonth() {
			if (this.currentDate.month == 0) {
				this.currentDate.month = 11;
				this.currentDate.year -= 1;
			} else {
				this.currentDate.month -= 1;
			}
		},
		nextMonth() {
			if (this.currentDate.month == 11) {
				this.currentDate.month = 0;
				this.currentDate.year += 1;
			} else {
				this.currentDate.month += 1;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
#calendar {
	margin: 0 auto;
	min-width: 400px;
	border: 1px solid #aeaeae;
	border-radius: 12px;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	background-color: #efefef;
	.wrap {
		padding: 12px 10px;

		&.bg {
			color: #fff;
			> section {
				background: rgba(0, 0, 0, 0.5);
				border-radius: 12px;
			}
		}
		> header {
			text-align: center;
			padding: 10px 0;
			.current-date {
				color: #000;
				.current-year {
					font-size: 30px;
					font-weight: bold;
				}
				.current-month {
					font-size: 24px;
					font-weight: bold;
					margin-top: 10px;
					.arrow {
						display: inline-block;
						width: 5px;
						height: 5px;
						border: solid #000;
						border-width: 0 3px 3px 0;
						padding: 3px;
						text-indent: -9999px;
						cursor: pointer;
						opacity: 0.5;
						&:hover {
							opacity: 1;
						}
						&.prev {
							transform: rotate(135deg);
						}
						&.next {
							transform: rotate(-45deg);
						}
					}
				}
			}
		}
		> section {
			padding: 10px 0;
			.week-days {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(14%, auto));
				> .week-day {
					text-align: center;
					padding: 10px 0;
					font-weight: bold;
					&:nth-child(7n) {
						color: #f92f2f;
					}
				}
			}
			.dates {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(14%, auto));
				row-gap: 10px;
				.date {
					text-align: center;
					cursor: pointer;
					> span {
						display: inline-block;
						width: 40px;
						height: 40px;
						line-height: 40px;
						border-radius: 40px;
					}
					&:not(.hidden-date):hover {
						> span {
							background: #e2e2e2;
						}
					}
					&:not(.hidden-date).active {
						> span {
							background: #cae5fd;
							color: #0073d8;
							font-weight: bold;
						}
					}
					&.hidden-date {
						color: #9c9c9c;
						&:nth-child(7n) {
							color: #cf5151;
						}
					}
					&:nth-child(7n) {
						color: #f92f2f;
					}
				}
			}
		}
	}
}
</style>
