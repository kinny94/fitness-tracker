var subject = new Rx.Subject();
subject.subscribe({
	next: function( value ){
		console.log( value );
	},
	error: function( error ){
		console.log( error );
	},
	complete: function( error ){
		console.log('completed!');
	}
})

subject.subscribe({
	next: function( value ){
		console.log( value );
	}
})

subject.next('A new data peice');
subject.complete();

var observable = Rx.Observable.interval( 1000 );

observable
.filter(( value ) => {
	return value % 2 == 0;
})
.subscribe({
	next: function( value ){
		console.log( value );
	},
	error: function( error ){
		console.log('Error: ',  error );
	}
});


var input = document.querySelector('input');
var observable = Rx.Observable.fromEvent(input, 'input');

observable
.map(event => event.target.value )
.debounceTime( 2000 )
.distinctUntilChanged()
.subscribe({
	next: (( event ) => {
		console.log( event.target.value )
	})
});


var observable = Rx.Observable.of( 1, 2, 3, 4, 5);

observable
.reduce(( total, current ) => {
	return total +  current;
}, 0)
.subscribe({
	next: ((value ) => {
		console.log( value );
	})
});

var observable = Rx.Observable.of( 1, 2, 3, 4, 5);

observable
.scan(( total, current ) => {
	return total +  current;
}, 0)
.subscribe({
	next: ((value ) => {
		console.log( value );
	})
})

//Scan is used if you are interested in the in between values as well. It does not need observable to be completed.
//Reduce is used if you're interested in the final value. It need the obsevable to be completed.
