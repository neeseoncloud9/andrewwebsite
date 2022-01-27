const angularRoutePaths = [
    '/',
    '/listings',
    '/contact/{id}',
    '/edit-listing/{id}',
    '/listings/{id}',
    '/my-listings',
    '/new-listing',
];

export const filesRoutes = angularRoutePaths.map(path => ({
    method: 'GET',
    path,
    handler: (req, h) => {
        return h.file('dist/andywebsite/index.html');
    }
}))

export const staticFilesRoute = {
    method: 'GET',
    path: '/{params*}',
    handler: {
        directory: {
            path: 'dist/andywebsite',
        }
    }
}