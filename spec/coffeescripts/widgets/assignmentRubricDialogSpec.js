/*
 * Copyright (C) 2015 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
//
// Copyright (C) 2015 - present Instructure, Inc.
//
// This file is part of Canvas.
//
// Canvas is free software: you can redistribute it and/or modify it under
// the terms of the GNU Affero General Public License as published by the Free
// Software Foundation, version 3 of the License.
//
// Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
// A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
// details.
//
// You should have received a copy of the GNU Affero General Public License along
// with this program. If not, see <http://www.gnu.org/licenses/>.

import $ from 'jquery'
import assignmentRubricDialog from 'compiled/widget/assignmentRubricDialog'

QUnit.module('assignmentRubricDialog', {
  setup() {
    this.server = sinon.createFakeServer({respondImmediately: true})
    this.server.respondWith([200, {}, '<img src="x" onerror="alert(document.cookie);">'])
  },

  teardown() {
    this.server.restore()
  }
})

test('make sure it picks up the right data attrs', () => {
  const $trigger = $('<div />').addClass('rubric_dialog_trigger')
  $trigger.data('noRubricExists', false)
  $trigger.data('url', '/example')
  $trigger.data('focusReturnsTo', '.announcement_cog')
  $('#fixtures').append($trigger)

  assignmentRubricDialog.initTriggers()

  equal(assignmentRubricDialog.noRubricExists, false)
  equal(assignmentRubricDialog.url, '/example')
  ok(assignmentRubricDialog.$focusReturnsTo)

  $('#fixtures').empty()
})

test('make sure it sanitizes html in dialog', () => {
  const $trigger = $('<div />').addClass('rubric_dialog_trigger')
  $trigger.data('noRubricExists', false)
  $trigger.data('url', '/example')
  $trigger.data('focusReturnsTo', '.announcement_cog')
  $('#fixtures').append($trigger)

  assignmentRubricDialog.initDialog()

  equal(assignmentRubricDialog.$dialog.html(), '<img src="x" style="display: inline;">')
  $('#fixtures').empty()
})
