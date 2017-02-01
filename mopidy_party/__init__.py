from __future__ import absolute_import, unicode_literals

import os

from mopidy import ext

__version__ = '0.0.1'



class mopidy_jukelecteur(ext.Extension):
    dist_name = 'jukebox'
    ext_name = 'party'
    version = __version__
    
    def get_default_config(self):
        conf_file = os.path.join(os.path.dirname(__file__), 'ext.conf')
        return config.read(conf_file)
    
    def setup(self, registry):
        registry.add('http:static', {
            'name': self.ext_name,
            'path': os.path.join(os.path.dirname(__file__), 'static'),
        })
    