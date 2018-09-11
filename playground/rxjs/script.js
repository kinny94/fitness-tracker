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

//Limitation with subbject is that it doesnot have an initial value or a starting value

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

var input = document.querySelector('input');
var observable = Rx.Observable.fromEvent( input, 'input');

observable
.pluck( 'target', 'value' )
.debounceTime( 500 )
.distinctUntilChanged()
.subscribe({
	next: (value) => {
		console.log( value );
	}
});


//Pluck is used to get values out from an object instead of maps
var input1 = document.querySelector('#input1');
var input2 = document.querySelector('#input2');

var span = document.querySelector('span');

var obs = Rx.Observable.fromEvent(input1, 'input');
var obs2 = Rx.Observable.fromEvent(input2, 'input');


obs.mergeMap(
	event1 => {
		return obs2.map( event2 => 	event1.target.value + ' ' + event2.target.value )
	}
)
.subscribe( value  => span.textContent = value )

var button = document.querySelector('button');
var obs1 = Rx.Observable.fromEvent(button, 'click');
var obs2 = Rx.Observable.interval(1000);

obs1.switchMap(
	event => {
		return obs2
	}
).subscribe(
	( value ) => console.log( value )
);
