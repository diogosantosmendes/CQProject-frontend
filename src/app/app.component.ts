import { Component } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html"
})

export class AppComponent{
  team = 'Diogo Mendes | Ricardo António | David Bernardo';
  today: number = Date.now();
}