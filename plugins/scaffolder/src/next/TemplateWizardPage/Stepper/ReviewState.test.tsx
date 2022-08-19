/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { ReviewState } from './ReviewState';
import { render } from '@testing-library/react';

describe('ReviewState', () => {
  it('should render the text as normal with no options', () => {
    const formState = {
      name: 'John Doe',
      test: 'bob',
    };

    const { getByRole } = render(
      <ReviewState formState={formState} schemas={[]} />,
    );

    expect(getByRole('row', { name: 'Name John Doe' })).toBeInTheDocument();
    expect(getByRole('row', { name: 'Test bob' })).toBeInTheDocument();
  });

  it('should mask password ui:fields', () => {
    const formState = {
      name: 'John Doe',
      test: 'bob',
    };

    const schemas = [
      {
        mergedSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              'ui:widget': 'password',
            },
          },
        },
      },
    ];

    const { getByRole } = render(
      <ReviewState formState={formState} schemas={schemas} />,
    );

    expect(getByRole('row', { name: 'Name ******' })).toBeInTheDocument();
  });
});
