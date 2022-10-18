import { SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { VersionCompareHelper } from './version-compare.helper';

export default function (app: NestFastifyApplication) {
    const versionComparer = new VersionCompareHelper(app).getOldVersion().getNewVersion().compare();
    const config = versionComparer.getCurrentConfig();
    SwaggerModule.setup('swagger', app, config);
}
