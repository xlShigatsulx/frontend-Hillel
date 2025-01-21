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

	createWeatherBox(data) {
        const containerUl = this.createEl({
            type: 'ul',
            attributes: { class: "weatherInfo"}
        })

		data.forEach( (item) => {
			if (item.key === 'Icon') return;
			const el = this.createEl({
				type: 'li',
				content: `${item.key} ${item.value}`
			});

			containerUl.appendChild(el);
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

		const iconId = data.find(item => item.key === 'Icon').value;
		const icon = this.createEl({
			type: 'img',
			attributes: {
				src: `https://openweathermap.org/img/wn/${iconId}@2x.png`,
				class: 'weatherIcon',
			},
		})

		btnUpDate.addEventListener('click', async () => {
			try {
				this.removeIconAndButton();
				this.clearContent(container);

				const cityName = selectElement.value;
				const weatherData = await fetchWeatherData(cityName);

				this.createWeatherBox(extractSpecificFields(weatherData));
				console.log('Weather data updated successfully!');
			} catch (error) {
				console.error('Failed to update weather data:', error);
			}
		})

        container.append(containerUl, icon, btnUpDate);
	}
}

	function getDateNow(locale = 'uk-UA') {
		const now = new Date()
		return now.toLocaleDateString(locale, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	function getTimeNow(locale = 'uk-UA') {
		const now = new Date()
		return now.toLocaleTimeString(locale, {
			hour: '2-digit',
			minute: '2-digit',
		})
	}

async function fetchWeatherData(cityName) {
    try {
        const apiKey = "d0a8f0783e0adcf8a62cd353c611c113";
        const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

        const url = new URL(baseUrl);
        url.searchParams.append("q", `${cityName},ua`);
        url.searchParams.append("appid", apiKey);

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`API Error: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();

        return data || [];
    } catch (error) {
        console.error("Failed to load weather data:", error.message);
        return null;
    }
}

function extractSpecificFields(data) {
	const fieldMapping = {
		name: 'Місце:',
		humidity: 'Вологість:',
		pressure: 'Тиск:',
		temp: 'Температура:',
		feels_like: 'Відчувається як:',
		speed: 'Вітер:',
		icon: 'Icon',
	}

  	const unitMapping = {
		temp: '°C',
		pressure: 'hPa',
		humidity: '%',
		feels_like: '%',
		speed: 'м/с',
	}

	const fields = Object.keys(fieldMapping)
	const result = [
		{ key: 'Дата:', value: getDateNow() },
		{ key: 'Час:', value: getTimeNow() },
	]

  	function extract(obj) {
		for (const [key, value] of Object.entries(obj)) {
			if (fields.includes(key)) {
				const displayKey = fieldMapping[key]
				const unit = unitMapping[key] || ''
				const formattedValue =
					typeof value === 'number' ? `${value} ${unit}` : value

				result.push({ key: displayKey, value: formattedValue })
			} else if (typeof value === 'object' && value !== null) {
				extract(value)
			} else if (Array.isArray(value)) {
				value.forEach(item => {
					if (typeof item === 'object' && item !== null) {
						extract(item)
					}
				})
			}
		}
	}

	extract(data)
	return result
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cityName = selectElement.value;
	const weatherManager = new WeatherManager(container);
    try {
		weatherManager.removeIconAndButton()
		weatherManager.clearContent(container)

		const weatherData = await fetchWeatherData(cityName)

		weatherManager.createWeatherBox(extractSpecificFields(weatherData))
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

                        weatherManager.createWeatherBox(extractSpecificFields(weatherData));
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
