from __future__ import absolute_import, unicode_literals

import os

from mopidy import ext

__version__ = '0.0.1'



class Extension(mopidy.ext.Extension):

    ext_name = 'party'
    version = __version__

    def get_default_config(self):
        directory = os.path.dirname(os.path.abspath(__file__))
        return mopidy.config.read(os.path.join(directory, 'ext.conf'))

    def setup(self, registry):
        directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')
        registry.add('http:static', dict(name=self.ext_name, path=directory))
