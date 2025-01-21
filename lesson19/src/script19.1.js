const form = document.forms[0];
const selectElement = document.querySelector('select[name="choices"]');
const container = document.querySelector('.weatherDetails');

class WeatherManager {
	constructor(container) {
		this.container = container;
	}

	createEl({ type = 'div', content, attributes } = {}) {
		const $el = document.createElement(type)

		if (content) {
			typeof content === 'string'
				? ($el.textContent = content)
				: $el.append(content)
		}

		if (attributes)
			Object.entries(attributes).forEach(([key, value]) => {
				$el.setAttribute(key, value)
			})

		return $el
	}

	clearContent(container, flag) {
		if (!container || container.nodeType !== 1) return

		while (container.firstElementChild) {
			container.firstElementChild.remove()
		}

		if (flag) container.remove()
	}

	removeIconAndButton() {
		const icon = document.querySelector('.weatherIcon')
		const updateButton = document.querySelector('.btnWeatherUpDate')
		if (icon) icon.remove()
		if (updateButton) updateButton.remove()
	}

	getDateNow(locale = 'uk-UA') {
		const now = new Date()
		return now.toLocaleDateString(locale, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	getTimeNow(locale = 'uk-UA') {
		const now = new Date()
		return now.toLocaleTimeString(locale, {
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	createWeatherBox(data) {
        const containerUl = this.createEl({
            type: 'ul',
            attributes: { class: "weatherInfo"}
        })
		const dateNow = this.createEl({
			type: 'li',
			content: `Дата: ${this.getDateNow()}`,
		})
		const timeNow = this.createEl({
			type: 'li',
			content: `Час: ${this.getTimeNow()}`,
		})
        const name = this.createEl({
            type: 'li',
            content: `Місце: ${data?.name}`
        })
		const humidity = this.createEl({
			type: 'li',
			content: `Вологість: ${data?.main?.humidity ?? 'N/A'} %`,
		})
		const pressure = this.createEl({
			type: 'li',
			content: `Тиск: ${data?.main?.pressure ?? 'N/A'} hPa`,
		})
		const temp = this.createEl({
			type: 'li',
			content: `Температура: ${
				Math.round(data?.main?.temp - 273.15) ?? 'N/A'
			} °C`,
		})
		const feelsLike = this.createEl({
			type: 'li',
			content: `Відчувається як: ${
				Math.round(data?.main?.feels_like - 273.15) ?? 'N/A'
			} °C`,
		})
		const wind = this.createEl({
			type: 'li',
			content: `Вітер: ${data?.wind?.speed ?? 'N/A'} м/с`,
		})
		const btnIcon = this.createEl({
			type: 'i',
			attributes: { class: 'fas fa-sync-alt' },
		})
		const btnUpDate = this.createEl({
			type: 'button',
			content: btnIcon,
			attributes: { class: 'btnWeatherUpDate' },
		})
		const icon = this.createEl({
			type: 'img',
			attributes: {
				src: `https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`,
				class: 'weatherIcon',
			},
		})

		btnUpDate.addEventListener('click', async () => {
			try {
				this.removeIconAndButton()
				this.clearContent(container)

				const cityName = selectElement.value
				const weatherData = await fetchWeatherData(cityName)

				this.createWeatherBox(weatherData)
				console.log('Weather data updated successfully!')
			} catch (error) {
				console.error('Failed to update weather data:', error)
			}
		})
		containerUl.append(
			dateNow,
			timeNow,
            name,
			humidity,
			pressure,
			temp,
			feelsLike,
			wind
		)
        container.append(containerUl, icon, btnUpDate)
	}
}

async function fetchWeatherData(cityName) {
    let weatherData;

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},ua&appid=d0a8f0783e0adcf8a62cd353c611c113`);
    if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
    }
    const data = await res.json();

    weatherData = data || []
    return weatherData
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cityName = selectElement.value;
	const weatherManager = new WeatherManager(container);
    try {
		weatherManager.removeIconAndButton()
		weatherManager.clearContent(container)

		const weatherData = await fetchWeatherData(cityName)

		weatherManager.createWeatherBox(weatherData)
		console.log('Weather data load successfully!')
	} catch (error) {
		console.error('Failed to load weather data:', error)
	}
});

(async () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const weatherManager = new WeatherManager(container);

                    try {
                        weatherManager.removeIconAndButton();
                        weatherManager.clearContent(container);

                        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d0a8f0783e0adcf8a62cd353c611c113`);
                        const weatherData = await res.json();

                        weatherManager.createWeatherBox(weatherData);
                        console.log('Weather data load successfully!');
                    } catch (error) {
                        console.error('Failed to load weather data:', error);
                    }
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.log("Користувач відхилив запит на геолокацію.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Інформація про місцезнаходження недоступна.");
                        break;
                    case error.TIMEOUT:
                        console.log("Перевищено час очікування.");
                        break;
                    default:
                        console.log("Сталася невідома помилка.");
                }
            }
        );
    } else {
        output.textContent = "Геолокація не підтримується вашим браузером.";
    }
})();
