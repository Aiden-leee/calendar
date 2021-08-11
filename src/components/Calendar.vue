<template>
	<div class="calendar-wrap">
		<template v-if="position">
			<input
				type="text"
				class="pos-calendar"
				@click="showCalendar"
				:value="inlineCurrentDate"
				readonly
			/>
			<label for=""></label>
		</template>
		<article
			:id="calendarId"
			class="calendar"
			:class="{ pos: position, showCalendar: isShowCalendar }"
			:style="{
				width: width + 'px',
				backgroundImage: this.bg ? `url(${currentBgImage})` : false,
			}"
		>
			<div class="wrap" :class="{ bg: currentBgImage }">
				<header>
					<div class="current-date">
						<div class="current-year arrow-wrap">
							<i class="arrow prev" @click="prevYear()">prev</i>
							{{ currentDate.year }}
							<i class="arrow next" @click="nextYear()">next</i>
						</div>
						<div class="current-month arrow-wrap">
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
	</div>
</template>

<script>
export default {
	props: {
		calendarId: {
			type: String,
		},
		width: {
			default: '400',
		},
		lang: {
			default: 'ko',
		},
		bg: {
			type: Array,
		},
		position: {
			type: Boolean,
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
			isShowCalendar: false,
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
			if (this.bg == undefined) {
				return;
			}
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
		// 선택된 날짜
		inlineCurrentDate() {
			let { year, month, date } = this.currentDate;
			return `${year}/${month + 1}/${date}`;
		},
	},
	created() {
		this.getCurrentDate();
	},
	mounted() {
		document
			.querySelector('body')
			.addEventListener('click', this.closeCalendar, false);
	},
	methods: {
		getCurrentDate() {
			let today = new Date();
			this.currentDate.date = today.getDate();
			this.currentDate.month = today.getMonth();
			this.currentDate.year = today.getFullYear();
		},
		prevYear() {
			this.currentDate.year -= 1;
		},
		nextYear() {
			this.currentDate.year += 1;
		},
		// 이전 달
		prevMonth() {
			if (this.currentDate.month == 0) {
				this.currentDate.month = 11;
				this.currentDate.year -= 1;
			} else {
				this.currentDate.month -= 1;
			}
		},
		// 다음 달
		nextMonth() {
			if (this.currentDate.month == 11) {
				this.currentDate.month = 0;
				this.currentDate.year += 1;
			} else {
				this.currentDate.month += 1;
			}
		},
		// 모달 캘린더 열기
		showCalendar() {
			this.isShowCalendar = true;
		},
		// 모달 캘린더 닫기
		closeCalendar(event) {
			let { target } = event;
			// class calednar, inline-calendar 를 제외한 영역 클릭시 calendar 닫기
			if (target.closest('.calendar, .pos-calendar') == null) {
				this.isShowCalendar = false;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.calendar-wrap {
	position: relative;
	display: inline-block;
	.pos-calendar {
		border: 1px solid #ccc;
		padding: 8px 10px;
		border-radius: 6px;
		cursor: pointer;
	}
	.calendar {
		margin: 0 auto;
		min-width: 400px;
		border: 1px solid #aeaeae;
		border-radius: 12px;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		background-color: #fff;
		&.pos {
			display: none;
			position: absolute;
			margin-top: 5px;
			&.showCalendar {
				display: block;
			}
		}
		.wrap {
			padding: 12px 10px;
			&.bg {
				color: #fff;
				background: rgba(0, 0, 0, 0.5);
				border-radius: 12px;
				> header {
					.current-date {
						.arrow-wrap {
							color: #fff;
							> i {
								border: solid #fff;
								border-width: 0 3px 3px 0;
								opacity: 0.8;
							}
						}
					}
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
						position: relative;
						font-size: 24px;
						font-weight: bold;
						margin-top: 10px;
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
		// arrow ui
		.arrow-wrap {
			position: relative;
			.arrow {
				position: absolute;
				top: 6px;
				display: inline-block;
				width: 5px;
				height: 5px;
				border: solid #000;
				border-width: 0 3px 3px 0;
				padding: 3px;
				text-indent: -9999px;
				overflow: hidden;
				cursor: pointer;
				opacity: 0.5;
				&:hover {
					opacity: 1;
				}
				&.prev {
					left: 30px;
					transform: rotate(135deg);
				}
				&.next {
					right: 30px;
					transform: rotate(-45deg);
				}
			}
		}
	}
}
</style>
