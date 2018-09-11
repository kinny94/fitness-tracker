// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	firebase: {
		apiKey: "AIzaSyD7wXQSO-iZJCAoLtlIGmtR8jslCv4Cl7g",
		authDomain: "fitness-tracker-e1c2c.firebaseapp.com",
		databaseURL: "https://fitness-tracker-e1c2c.firebaseio.com",
		projectId: "fitness-tracker-e1c2c",
		storageBucket: "fitness-tracker-e1c2c.appspot.com",
		messagingSenderId: "19116483713"
	}
};

/*
* In development mode, for easier debugging, you can ignore zone related error
* stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
* below file. Don't forget to comment it out in production mode
* because it will have a performance impact when errors are thrown
*/
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
