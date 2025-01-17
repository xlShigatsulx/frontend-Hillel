class TimersViewManager {
	createEl({ type = 'div', content, attributes } = {}) {
		const $el = document.createElement(type);

		if (content) {
			typeof content === 'string'
			? ($el.textContent = content)
			: $el.append(content);
		}

		if (attributes)
			Object.entries(attributes).forEach(([key, value]) => {
				$el.setAttribute(key, value);
			});

		return $el;
	}

	clearContent(container, flag) {
		if (!container && container.nodeType !== 1) return

		while (container.firstElementChild) {
			container.firstElementChild.remove();
		}

		if (flag) container.remove();
	}

	createTimerBox(id, inputValue) {
		const container = this.createEl({ attributes: { 'data-timer': id } });
		const btnContainer = this.createEl({});
		const label = this.createEl({ type: 'label', content: inputValue });
		const stopBtn = this.createEl({
			type: 'button',
			content: 'stop',
			attributes: { 'data-stop': id }
		});
		const continueBtn = this.createEl({
			type: 'button',
			content: 'continue',
			attributes: { 'data-continue': id }
		});
		const deleteBtn = this.createEl({
			type: 'button',
			content: 'delete',
			attributes: { 'data-delete': id }
		});

		btnContainer.append(stopBtn, continueBtn, deleteBtn);

		container.append(label, btnContainer);

		return container;
	}
}

class Timer extends TimersViewManager {
	constructor(root) {
		super();
		this.timers = [];
		this.root = root;
		this.container = null;
	}

    timeStringToSeconds(timeString) {
        const [minutes, seconds] = timeString.split(":").map(Number);
        return minutes * 60 + seconds;
    }

    formatTime(seconds) {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    }

	initTimer() {
		const timerId = JSON.stringify(Math.random());
        const inputValue = document.querySelector('input[name="timerValue"]').value;
        let totalSeconds = this.timeStringToSeconds(inputValue);
		const timerBox = this.createTimerBox(timerId, this.formatTime(totalSeconds));

        const validityTime = /^[0-5]?\d:[0-5]\d$/;
        if (!validityTime.test(inputValue)) {
            alert("Введите корректное время в формате MM:SS");
            return;
        }

		const timerData = {
			timerId,
			intervalId: null,
			totalSeconds,
			timerBox
		};
		this.timers.push(timerData);
        
        this.startTimer(timerId);
		this.container.append(timerBox);
	}

	stopTimer(timerId) {
		const timer = this.timers.find(timer => timer.timerId === timerId)
		if (timer) {
			clearInterval(timer.intervalId);
            timer.intervalId = null;
		}
	}

startTimer(timerId) {
    const timer = this.timers.find(timer => timer.timerId === timerId);
    if (timer && !timer.intervalId) {
        if (timer.totalSeconds <= 0) {
            timer.timerBox.firstElementChild.textContent = "Время вышло!";
            return;
        }

        timer.intervalId = setInterval(() => {
            if (timer.totalSeconds <= 0) {
                clearInterval(timer.intervalId);
                timer.intervalId = null;
                timer.timerBox.firstElementChild.textContent = "Время вышло!";
                return;
            }

            timer.totalSeconds--;
            timer.timerBox.firstElementChild.textContent = this.formatTime(timer.totalSeconds);
        }, 1000);
    }
}

    deleteTimer(timerId) {
        const timer = this.timers.find(timer => timer.timerId === timerId);
        if (timer) {
            clearInterval(timer.intervalId);
            this.timers = this.timers.filter(({ timerId: id }) => id !== timer.timerId);
            this.clearContent(timer.timerBox, true);
        }
    }

	init() {
		const createBtn = this.createEl({
			content: this.createEl({
				type: 'button',
				content: 'Create timer'
			})
		});
		const timerContainer = this.createEl({
			content: createBtn,
			attributes: { id: 'timers' }
		});
		this.container = timerContainer;

		createBtn.addEventListener('click', () => {
			this.initTimer();
		})

		timerContainer.addEventListener('click', e => {
			const el = e.target;
			const dataAttributes = el.dataset;

			if ('stop' in dataAttributes) {
				this.stopTimer(dataAttributes.stop);
			} else if ('continue' in dataAttributes) {
				this.startTimer(dataAttributes.continue);
			} else if ('delete' in dataAttributes) {
				this.deleteTimer(dataAttributes.delete);
			}
		})

		this.root.append(createBtn, timerContainer);
	}
}

new Timer(document.body).init();
