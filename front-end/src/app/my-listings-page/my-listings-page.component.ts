import { Component, OnInit } from '@angular/core';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
    selector: 'app-my-listings-page',
    templateUrl: './my-listings-page.component.html',
    styleUrls: ['./my-listings-page.component.css']
})
export class MyListingsPageComponent implements OnInit {
    listings: Listing[] = [];

    constructor(
        private listingService: ListingsService,
    ) { }

    ngOnInit(): void {
        this.listingService.getListingsForUser()
        .subscribe(listings => this.listings = listings);
    }

    onDeleteClicked(listingId: string): void {
        this.listingService.deleteListing(listingId)
        .subscribe(() => {
            this.listings = this.listings.filter(
                listing => listing.id !== listingId
            );
        })
    }

}
