const { withDangerousMod } = require('@expo/config-plugins');
const path = require('path');
const fs = require('fs');

const withFirebaseModularHeaders = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      let contents = fs.readFileSync(podfilePath, 'utf8');

      if (!contents.includes('use_modular_headers!')) {
        contents = contents.replace(
          /^(platform :ios,.+)$/m,
          `$1\nuse_modular_headers!`
        );
        fs.writeFileSync(podfilePath, contents);
      }

      return config;
    },
  ]);
};

module.exports = withFirebaseModularHeaders;
