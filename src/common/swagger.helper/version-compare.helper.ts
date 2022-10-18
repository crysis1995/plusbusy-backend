import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';

export class VersionCompareHelper {
    private app: NestFastifyApplication;
    constructor(app: NestFastifyApplication) {
        this.app = app;
    }

    public static defaultOptions = {
        version: '0.1'
    };
    private isSame = false;
    private oldVersionData: any;
    private oldVersion: string | undefined;
    private newVersionData: any;
    private currentVersion: any;

    getOldVersion() {
        try {
            const existingSwaggerConfig = JSON.parse(
                fs.readFileSync('./swagger/swagger-spec.json').toString()
            );

            this.oldVersion = existingSwaggerConfig?.info?.version;
            this.oldVersionData = existingSwaggerConfig;
        } catch (e) {}

        return this;
    }

    private produceNewConfig(options?: { withVersion: boolean }) {
        const builder = new DocumentBuilder()
            .setTitle('Bus Transport')
            .setDescription('The API of bus transport management app.')
            .addTag('driver');
        if (options?.withVersion) {
            builder.setVersion(this.currentVersion);
        } else {
            builder.setVersion(VersionCompareHelper.defaultOptions.version);
        }

        return SwaggerModule.createDocument(this.app, builder.build());
    }

    getNewVersion() {
        this.newVersionData = this.produceNewConfig();

        return this;
    }

    compare() {
        this.isSame = true;
        const isStringSame = (oldData, newData) => {
            return JSON.stringify(oldData) === JSON.stringify(newData);
        };

        const checkIfPropertyIsSame = (prop: string) => {
            const test = isStringSame(this.oldVersionData?.[prop], this.newVersionData?.[prop]);
            this.isSame = this.isSame && test;
        };

        /*checks*/
        checkIfPropertyIsSame('paths');
        checkIfPropertyIsSame('components');
        checkIfPropertyIsSame('tags');
        checkIfPropertyIsSame('servers');
        checkIfPropertyIsSame('openapi');
        return this;
    }

    private updateVersion() {
        if (!this.oldVersion) return VersionCompareHelper.defaultOptions.version;
        const array = this.oldVersion.split('.');
        const major = parseInt(array[0]);
        const minor = parseInt(array[1]);
        return `${major}.${minor + 1}`;
    }

    getCurrentConfig() {
        this.currentVersion = !this.isSame ? this.updateVersion() : this.oldVersion;
        const newConfig = this.produceNewConfig({ withVersion: true });
        if (!this.isSame) {
            new Logger().log('Swagger version updated! Current is ' + this.currentVersion);
            fs.writeFileSync('./swagger/swagger-spec.json', JSON.stringify(newConfig));
        }
        return newConfig;
    }
}
