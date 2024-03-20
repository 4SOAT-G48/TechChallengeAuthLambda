'use strict';

import { lambdaHandler } from '../../app.js';
import { expect } from 'chai';

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const event = {
            body: JSON.stringify({
                cpf: 'user-cpf',
                password: 'user-password'
            })
        };
        const context = {};

        const result = await lambdaHandler(event, context);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.message).to.be.equal("User logged in successfully");
    });
});

