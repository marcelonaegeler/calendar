var Calendar = ( function () {

	var date = new Date(); // Current date

	/*
	* Calendar template
	**/
	var template;
	view.getTemplate( 'calendar', function ( h ) { template = h });

	/*
	* Month's full names
	**/
	var fullNames = {
		month: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ]
		, days: [ 'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado' ]
	};

	/*
	* currentDate: return the current day, month, year and the first day of the month
	**/
	var currentDate = function( setDate ) {
		if ( setDate ) {
			date = setDate;
		}

		var d = {
			day: date.getDate()
			, month: date.getMonth()
			, year: date.getFullYear()
		};

		d.firstDay = new Date( d.year, d.month, 1 ).getDay();
		d.amountDays = new Date( d.year, d.month + 1, 0 ).getDate();

		return d;
	};

	var nextMonth = function () {
		
	};

	/*
	* Set HTML triggers on calendar
	**/
	var setTriggers = function ( c ) {
		var triggers = c.querySelectorAll( '.calendar-action' );
		console.log( triggers );
	};

	/*
	* Init calendar
	**/
	var start = function ( d, c ) {
		d = currentDate( d );

		var data = {
			date: d
			, long_month: fullNames.month[ d.month ]
		};

		var t = templateEngine( template, data );
		c.appendChild( t );

		setTriggers( c );
	};

	var waitTemplate = function ( c ) {
		var t = setInterval( function () {
			if ( template ) {
				clearInterval( t );
				start( null, c );
			}
		}, 100 );
	};

	var init = function ( c ) {
		if ( '[object NodeList]' === c.toString() ) {
			for ( var i = 0, l = c.length; i < l; i++ ) {
				waitTemplate( c[ i ].parentNode );
			}
		} else {
			waitTemplate( c );
		}
	};

	return {
		init: init
	};
	
})();