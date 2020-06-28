const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static direction to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Tobias Steinhagen',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Tobias Steinhagen',
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		helpMsg: 'I need some Help',
		name: 'Tobias Steinhagen',
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address!',
		})
	}
	geocode(req.query.address, (err, data) => {
		if (err) {
			return res.send({
				error: err,
			})
		}
		forecast(data, (err, forecastData) => {
			if (err) {
				return res.send({
					error: err,
				})
			}
			res.send({
				forecast: forecastData,
				location: data.location,
				address: req.query.address,
			})
		})
	})
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term!',
		})
	}

	console.log(req.query.search)
	res.send({
		products: [],
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMsg: 'Help article not found',
		name: 'Tobias Steinhagen',
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMsg: 'Page not found',
		name: 'Tobias Steinhagen',
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000.')
})
