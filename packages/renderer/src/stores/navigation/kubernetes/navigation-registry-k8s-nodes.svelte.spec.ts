/**********************************************************************
 * Copyright (C) 2024-2025 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

import type { KubernetesObject } from '@kubernetes/client-node';
import { expect, test, vi } from 'vitest';

import { createNavigationKubernetesNodesEntry } from './navigation-registry-k8s-nodes.svelte';

test('createNavigationKubernetesNodesEntry', async () => {
  const nodes: KubernetesObject[] = [
    {
      apiVersion: 'v1',
      kind: 'Node',
      metadata: {
        name: 'node1',
      },
    },
    {
      apiVersion: 'v1',
      kind: 'Node',
      metadata: {
        name: 'node2',
      },
    },
  ];
  vi.mocked(window.kubernetesRegisterGetCurrentContextResources).mockResolvedValue(nodes);

  const entry = createNavigationKubernetesNodesEntry();

  expect(entry).toBeDefined();
  expect(entry.name).toBe('Nodes');
  expect(entry.link).toBe('/kubernetes/nodes');
  expect(entry.tooltip).toBe('Nodes');
  await vi.waitFor(() => {
    expect(entry.counter).toBe(2);
  });
});
