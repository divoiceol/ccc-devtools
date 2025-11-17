const fse = require('fs-extra');
const path = require('path');

const localTemplatePath = path.join(__dirname, '../release/preview-template');
const projectTemplatePath = 'F:/workspace/xiaoji/xiaoji-client/creator/preview-template';


if (!fse.existsSync(projectTemplatePath)) {
    console.error('project path not exist');
    return;
}
fse.removeSync(projectTemplatePath);
fse.copy(localTemplatePath, projectTemplatePath).then(() => {
    console.log('更新预览模板成功');
}).catch(err => {
    console.error('更新预览模板失败', err);
});