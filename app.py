# -*- coding: utf-8 -*-
import cgi
import json
import logging
import os
import re
import urllib
import webapp2

from google.appengine.ext.webapp import template

from metadata import generate_metadata

slug_regexp = r"[a-z0-9-]+"
step_slug_regexp = re.compile(r'^(([1-9][0-9]*)-%s).md$' % slug_regexp)

# metadata = generate_metadata(
#           os.path.join(os.path.dirname(__file__), 'static', 'codelabs'),
#           step_slug_regexp,
#           'metadata.yaml')

""" Transform Metadata to json """
class Metadata(webapp2.RequestHandler):
  def get(self):
    lang = self.request.get('locale')
    if not lang:
      lang = 'en'

    metadata = generate_metadata(
      os.path.join(os.path.dirname(__file__), 'static', 'codelabs', lang),
      step_slug_regexp,
      'metadata.yaml')

    if not metadata:
      message = 'Language not found'
      logging.error(message)
      self.response.set_status(404)
      self.response.out.write(message)
      return

    self.response.out.write(json.dumps(metadata))

app = webapp2.WSGIApplication([
  ('/metadata/.*', Metadata)
], debug=True)
