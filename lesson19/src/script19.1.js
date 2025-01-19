const form = document.forms.weatherForm;
const selectElement = document.querySelector('select[name="choices"]');
const weatherDetails = document.querySelector('.weatherDetails');

class WeatherBox {
    constructor(container = form){
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
        if (!container || container.nodeType !== 1) return;

        while (container.firstElementChild) {
            container.firstElementChild.remove();
        }

        if (flag) container.remove();
    }

    removeIconAndButton() {
        const icon = document.querySelector('.weatherIcon');
        const updateButton = document.querySelector('.btnWeatherForm');
        if (icon) icon.remove();
        if (updateButton) updateButton.remove();
    }


    getDateNow(locale = 'uk-UA') {
        const now = new Date();
        return now.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    getTimeNow(locale = 'uk-UA') {
        const now = new Date();
        return now.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

	createWeatherBox(data, container = this.container) {
        const dateNow = this.createEl({ type: 'label', content: `Дата: ${this.getDateNow()}` });
        const timeNow = this.createEl({ type: 'label', content: `Час: ${this.getTimeNow()}` });
        const humidity = this.createEl({ type: 'label', content: `Вологість: ${data?.main?.humidity ?? 'N/A'} %` });
        const pressure = this.createEl({ type: 'label', content: `Тиск: ${data?.main?.pressure ?? 'N/A'} hPa` });
        const temp = this.createEl({ type: 'label', content: `Температура: ${Math.round(data?.main?.temp - 273.15) ?? 'N/A'} °C` });
        const feelsLike = this.createEl({ type: 'label', content: `Відчувається як: ${Math.round(data?.main?.feels_like - 273.15) ?? 'N/A'} °C` });
        const wind = this.createEl({ type: 'label', content: `Вітер: ${data?.wind?.speed ?? 'N/A'} м/с` });
        const btnIcon = this.createEl({ type: 'i', attributes: {class: "fas fa-sync-alt"}});
        const btnUpDate = this.createEl({ type: 'button', content: btnIcon, attributes: { class: "btnWeatherForm"}});
        const icon = this.createEl({type: 'img', attributes: { src: `https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`, class: 'weatherIcon'}});

        btnUpDate.addEventListener('click', async () => {
            try {
                this.removeIconAndButton();
                this.clearContent(container);

                const cityName = selectElement.value;
                const weatherData = await fetchWeatherData(cityName);

                this.createWeatherBox(weatherData, container);
                console.log('Weather data updated successfully!');
            } catch (error) {
                console.error('Failed to update weather data:', error);
            }
        });

        const fragment = document.createDocumentFragment();
		fragment.append(dateNow, timeNow, humidity, pressure, temp, feelsLike, wind);
        weatherDetails.append(icon, btnUpDate);
        container.append(fragment);
	}
}

async function fetchWeatherData(cityName) {
    let weather;

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},ua&appid=d0a8f0783e0adcf8a62cd353c611c113`);
    if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
    }
    const data = await res.json();

    weather = data || [];
    return weather;
}

document.addEventListener('DOMContentLoaded', async () => {
    const cityName = selectElement.value;
    const weatherManager = new WeatherBox();
    
    try {
        const weatherData = await fetchWeatherData(cityName);
        weatherManager.createWeatherBox(weatherData);
    } catch (error) {
        console.error('Failed to fetch initial weather data:', error);
    }
});
