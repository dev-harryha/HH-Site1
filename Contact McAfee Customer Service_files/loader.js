define([
    './mfe-flexi-support-viewModel',
    'ojs/ojcomposite',
    'text!./mfe-flexi-support-view.html',
    'text!./component.json',
    'css!./mfe-flexi-support-styles'
], function (
    viewModel,
    Composite,
    view,
    metadata) {
        'use strict';

        Composite.register('mfe-flexi-support', {
            view: view,
            viewModel: viewModel,
            metadata: JSON.parse(metadata)
        });
    }
);