import { getAllListingsRoute } from "./getAllListings";
import { getListingRoute } from "./getListing";
import { addViewToListRoute } from "./addViewToListing";
import { filesRoutes, staticFilesRoute } from "./files";
import { getUserListingsRoute } from "./getUserListings";
import { createNewListingRoute } from "./createNewListing";
import { updateListingRoute } from "./updateListing";
import { deleteListingRoute } from "./deleteListing";

export default [
    deleteListingRoute,
    updateListingRoute,
    createNewListingRoute,
    getUserListingsRoute,
    addViewToListRoute,
    getAllListingsRoute,
    getListingRoute,
    staticFilesRoute,
    ...filesRoutes,
];