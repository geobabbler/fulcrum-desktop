'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_MARGIN = '0.75in';
const DEFAULT_PAGE_SIZE = 'Letter';
const DEFAULT_IMAGE_QUALITY = '85';
const DEFAULT_ORIENTATION = 'Portrait';

class HtmlToPdf {
  constructor(html, header, footer, cover) {
    this.tempID = _uuid2.default.v4();
    this.debug = false;
    this.html = html;
    this.header = header;
    this.footer = footer;
    this.cover = cover;
    this.marginTop = DEFAULT_MARGIN;
    this.marginBottom = DEFAULT_MARGIN;
    this.marginLeft = DEFAULT_MARGIN;
    this.marginRight = DEFAULT_MARGIN;
    this.pageSize = DEFAULT_PAGE_SIZE;
    this.imageQuality = DEFAULT_IMAGE_QUALITY;
    this.orientation = DEFAULT_ORIENTATION;
  }

  get binary() {
    return '/usr/local/bin/wkhtmltopdf';
  }

  get command() {
    const parts = ['--page-size', this.pageSize, '--margin-top', this.marginTop, '--margin-left', this.marginLeft, '--margin-bottom', this.marginBottom, '--margin-right', this.marginRight, '--image-quality', this.imageQuality, '--orientation', this.orientation, '--encoding', 'UTF-8', this.quietArgument, this.coverArgument, this.headerArgument, this.footerArgument, this.inputArgument, this.headerArgument, this.footerArgument, this.outputArgument];

    return _lodash2.default.compact(parts);
  }

  tempFilePath(part, ext = 'html') {
    return _path2.default.join(_os2.default.tmpdir(), `${this.tempID}_${part}.${ext}`);
  }

  get quietArgument() {
    return '--quiet';
    // return this.debug ? null : '--quiet';
  }

  get inputArgument() {
    return '-';
  }

  get outputArgument() {
    return this.tempFilePath(this.tempID + '_output', 'pdf');
  }

  get coverArgument() {
    if (this.cover) {
      const coverPath = this.tempFilePath('cover');

      _fs2.default.writeFileSync(coverPath, this.cover);

      return `cover "${coverPath}"`;
    }

    return null;
  }

  get headerArgument() {
    if (this.header) {
      const headerPath = this.tempFilePath('header');

      _fs2.default.writeFileSync(headerPath, this.header);

      return `--header-html "${headerPath}"`;
    }

    return null;
  }

  get footerArgument() {
    if (this.footer) {
      const footerPath = this.tempFilePath('footer');

      _fs2.default.writeFileSync(footerPath, this.footer);

      return `--footer-html "${footerPath}"`;
    }

    return null;
  }

  run() {
    return new Promise((resolve, reject) => {
      const cmd = this.command;

      const process = (0, _child_process.spawn)(this.binary, cmd, {});

      const stdout = [];
      const stderr = [];

      process.stdin.setEncoding('utf8');
      process.stdin.end(this.html);

      process.stdout.on('data', data => {
        stdout.push(data.toString());
      });

      process.stderr.on('data', data => {
        stderr.push(data.toString());
      });

      process.on('close', code => {
        _fs2.default.stat(this.outputArgument, (err, stat) => {
          if (err) {
            return reject(err);
          }

          return resolve({ code: code,
            stdout: stdout,
            stderr: stderr,
            size: stat.size,
            file: this.outputArgument });
        });
      });
    });
  }

  cleanup() {
    const files = [this.tempFilePath('header'), this.tempFilePath('cover'), this.tempFilePath('content'), this.tempFilePath('footer'), this.tempFilePath('toc', 'xml'), this.tempFilePath('output', 'pdf')];

    return new Promise((resolve, reject) => {
      _async2.default.each(files, _rimraf2.default, err => {
        if (err) {
          return reject(err);
        } else {
          return resolve();
        }
      });
    });
  }
}
exports.default = HtmlToPdf;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL3JlcG9ydHMvaHRtbC10by1wZGYuanMiXSwibmFtZXMiOlsiREVGQVVMVF9NQVJHSU4iLCJERUZBVUxUX1BBR0VfU0laRSIsIkRFRkFVTFRfSU1BR0VfUVVBTElUWSIsIkRFRkFVTFRfT1JJRU5UQVRJT04iLCJIdG1sVG9QZGYiLCJjb25zdHJ1Y3RvciIsImh0bWwiLCJoZWFkZXIiLCJmb290ZXIiLCJjb3ZlciIsInRlbXBJRCIsInY0IiwiZGVidWciLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJwYWdlU2l6ZSIsImltYWdlUXVhbGl0eSIsIm9yaWVudGF0aW9uIiwiYmluYXJ5IiwiY29tbWFuZCIsInBhcnRzIiwicXVpZXRBcmd1bWVudCIsImNvdmVyQXJndW1lbnQiLCJoZWFkZXJBcmd1bWVudCIsImZvb3RlckFyZ3VtZW50IiwiaW5wdXRBcmd1bWVudCIsIm91dHB1dEFyZ3VtZW50IiwiY29tcGFjdCIsInRlbXBGaWxlUGF0aCIsInBhcnQiLCJleHQiLCJqb2luIiwidG1wZGlyIiwiY292ZXJQYXRoIiwid3JpdGVGaWxlU3luYyIsImhlYWRlclBhdGgiLCJmb290ZXJQYXRoIiwicnVuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjbWQiLCJwcm9jZXNzIiwic3Rkb3V0Iiwic3RkZXJyIiwic3RkaW4iLCJzZXRFbmNvZGluZyIsImVuZCIsIm9uIiwiZGF0YSIsInB1c2giLCJ0b1N0cmluZyIsImNvZGUiLCJzdGF0IiwiZXJyIiwic2l6ZSIsImZpbGUiLCJjbGVhbnVwIiwiZmlsZXMiLCJlYWNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsaUJBQWlCLFFBQXZCO0FBQ0EsTUFBTUMsb0JBQW9CLFFBQTFCO0FBQ0EsTUFBTUMs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SUFIWjtBQUlDQyxrQkFBTSxLQUFLOUIsY0FKWixFQUFSLENBQVA7QUFLRCxTQVZEO0FBV0QsT0FaRDtBQWFELEtBaENNLENBQVA7QUFpQ0Q7O0FBRUQrQixZQUFVO0FBQ1IsVUFBTUMsUUFBUSxDQUNaLEtBQUs5QixZQUFMLENBQWtCLFFBQWxCLENBRFksRUFFWixLQUFLQSxZQUFMLENBQWtCLE9BQWxCLENBRlksRUFHWixLQUFLQSxZQUFMLENBQWtCLFNBQWxCLENBSFksRUFJWixLQUFLQSxZQUFMLENBQWtCLFFBQWxCLENBSlksRUFLWixLQUFLQSxZQUFMLENBQWtCLEtBQWxCLEVBQXlCLEtBQXpCLENBTFksRUFNWixLQUFLQSxZQUFMLENBQWtCLFFBQWxCLEVBQTRCLEtBQTVCLENBTlksQ0FBZDs7QUFTQSxXQUFPLElBQUlVLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDdEMsc0JBQU1tQixJQUFOLENBQVdELEtBQVgsb0JBQTJCSixHQUFELElBQVM7QUFDakMsWUFBSUEsR0FBSixFQUFTO0FBQ1AsaUJBQU9kLE9BQU9jLEdBQVAsQ0FBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPZixTQUFQO0FBQ0Q7QUFDRixPQU5EO0FBT0QsS0FSTSxDQUFQO0FBU0Q7QUF2SjRCO2tCQUFWckMsUyIsImZpbGUiOiJodG1sLXRvLXBkZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBzcGF3biB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcbmltcG9ydCByaW1yYWYgZnJvbSAncmltcmFmJztcblxuY29uc3QgREVGQVVMVF9NQVJHSU4gPSAnMC43NWluJztcbmNvbnN0IERFRkFVTFRfUEFHRV9TSVpFID0gJ0xldHRlcic7XG5jb25zdCBERUZBVUxUX0lNQUdFX1FVQUxJVFkgPSAnODUnO1xuY29uc3QgREVGQVVMVF9PUklFTlRBVElPTiA9ICdQb3J0cmFpdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh0bWxUb1BkZiB7XG4gIGNvbnN0cnVjdG9yKGh0bWwsIGhlYWRlciwgZm9vdGVyLCBjb3Zlcikge1xuICAgIHRoaXMudGVtcElEID0gdXVpZC52NCgpO1xuICAgIHRoaXMuZGVidWcgPSBmYWxzZTtcbiAgICB0aGlzLmh0bWwgPSBodG1sO1xuICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgIHRoaXMuZm9vdGVyID0gZm9vdGVyO1xuICAgIHRoaXMuY292ZXIgPSBjb3ZlcjtcbiAgICB0aGlzLm1hcmdpblRvcCA9IERFRkFVTFRfTUFSR0lOO1xuICAgIHRoaXMubWFyZ2luQm90dG9tID0gREVGQVVMVF9NQVJHSU47XG4gICAgdGhpcy5tYXJnaW5MZWZ0ID0gREVGQVVMVF9NQVJHSU47XG4gICAgdGhpcy5tYXJnaW5SaWdodCA9IERFRkFVTFRfTUFSR0lOO1xuICAgIHRoaXMucGFnZVNpemUgPSBERUZBVUxUX1BBR0VfU0laRTtcbiAgICB0aGlzLmltYWdlUXVhbGl0eSA9IERFRkFVTFRfSU1BR0VfUVVBTElUWTtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gREVGQVVMVF9PUklFTlRBVElPTjtcbiAgfVxuXG4gIGdldCBiaW5hcnkoKSB7XG4gICAgcmV0dXJuICcvdXNyL2xvY2FsL2Jpbi93a2h0bWx0b3BkZic7XG4gIH1cblxuICBnZXQgY29tbWFuZCgpIHtcbiAgICBjb25zdCBwYXJ0cyA9IFtcbiAgICAgICctLXBhZ2Utc2l6ZScsIHRoaXMucGFnZVNpemUsXG4gICAgICAnLS1tYXJnaW4tdG9wJywgdGhpcy5tYXJnaW5Ub3AsXG4gICAgICAnLS1tYXJnaW4tbGVmdCcsIHRoaXMubWFyZ2luTGVmdCxcbiAgICAgICctLW1hcmdpbi1ib3R0b20nLCB0aGlzLm1hcmdpbkJvdHRvbSxcbiAgICAgICctLW1hcmdpbi1yaWdodCcsIHRoaXMubWFyZ2luUmlnaHQsXG4gICAgICAnLS1pbWFnZS1xdWFsaXR5JywgdGhpcy5pbWFnZVF1YWxpdHksXG4gICAgICAnLS1vcmllbnRhdGlvbicsIHRoaXMub3JpZW50YXRpb24sXG4gICAgICAnLS1lbmNvZGluZycsICdVVEYtOCcsXG4gICAgICB0aGlzLnF1aWV0QXJndW1lbnQsXG4gICAgICB0aGlzLmNvdmVyQXJndW1lbnQsXG4gICAgICB0aGlzLmhlYWRlckFyZ3VtZW50LFxuICAgICAgdGhpcy5mb290ZXJBcmd1bWVudCxcbiAgICAgIHRoaXMuaW5wdXRBcmd1bWVudCxcbiAgICAgIHRoaXMuaGVhZGVyQXJndW1lbnQsXG4gICAgICB0aGlzLmZvb3RlckFyZ3VtZW50LFxuICAgICAgdGhpcy5vdXRwdXRBcmd1bWVudCBdO1xuXG4gICAgcmV0dXJuIF8uY29tcGFjdChwYXJ0cyk7XG4gIH1cblxuICB0ZW1wRmlsZVBhdGgocGFydCwgZXh0ID0gJ2h0bWwnKSB7XG4gICAgcmV0dXJuIHBhdGguam9pbihvcy50bXBkaXIoKSwgYCR7dGhpcy50ZW1wSUR9XyR7cGFydH0uJHtleHR9YCk7XG4gIH1cblxuICBnZXQgcXVpZXRBcmd1bWVudCgpIHtcbiAgICByZXR1cm4gJy0tcXVpZXQnO1xuICAgIC8vIHJldHVybiB0aGlzLmRlYnVnID8gbnVsbCA6ICctLXF1aWV0JztcbiAgfVxuXG4gIGdldCBpbnB1dEFyZ3VtZW50KCkge1xuICAgIHJldHVybiAnLSc7XG4gIH1cblxuICBnZXQgb3V0cHV0QXJndW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudGVtcEZpbGVQYXRoKHRoaXMudGVtcElEICsgJ19vdXRwdXQnLCAncGRmJyk7XG4gIH1cblxuICBnZXQgY292ZXJBcmd1bWVudCgpIHtcbiAgICBpZiAodGhpcy5jb3Zlcikge1xuICAgICAgY29uc3QgY292ZXJQYXRoID0gdGhpcy50ZW1wRmlsZVBhdGgoJ2NvdmVyJyk7XG5cbiAgICAgIGZzLndyaXRlRmlsZVN5bmMoY292ZXJQYXRoLCB0aGlzLmNvdmVyKTtcblxuICAgICAgcmV0dXJuIGBjb3ZlciBcIiR7Y292ZXJQYXRofVwiYDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldCBoZWFkZXJBcmd1bWVudCgpIHtcbiAgICBpZiAodGhpcy5oZWFkZXIpIHtcbiAgICAgIGNvbnN0IGhlYWRlclBhdGggPSB0aGlzLnRlbXBGaWxlUGF0aCgnaGVhZGVyJyk7XG5cbiAgICAgIGZzLndyaXRlRmlsZVN5bmMoaGVhZGVyUGF0aCwgdGhpcy5oZWFkZXIpO1xuXG4gICAgICByZXR1cm4gYC0taGVhZGVyLWh0bWwgXCIke2hlYWRlclBhdGh9XCJgO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0IGZvb3RlckFyZ3VtZW50KCkge1xuICAgIGlmICh0aGlzLmZvb3Rlcikge1xuICAgICAgY29uc3QgZm9vdGVyUGF0aCA9IHRoaXMudGVtcEZpbGVQYXRoKCdmb290ZXInKTtcblxuICAgICAgZnMud3JpdGVGaWxlU3luYyhmb290ZXJQYXRoLCB0aGlzLmZvb3Rlcik7XG5cbiAgICAgIHJldHVybiBgLS1mb290ZXItaHRtbCBcIiR7Zm9vdGVyUGF0aH1cImA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBydW4oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNtZCA9IHRoaXMuY29tbWFuZDtcblxuICAgICAgY29uc3QgcHJvY2VzcyA9IHNwYXduKHRoaXMuYmluYXJ5LCBjbWQsIHt9KTtcblxuICAgICAgY29uc3Qgc3Rkb3V0ID0gW107XG4gICAgICBjb25zdCBzdGRlcnIgPSBbXTtcblxuICAgICAgcHJvY2Vzcy5zdGRpbi5zZXRFbmNvZGluZygndXRmOCcpO1xuICAgICAgcHJvY2Vzcy5zdGRpbi5lbmQodGhpcy5odG1sKTtcblxuICAgICAgcHJvY2Vzcy5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgICBzdGRvdXQucHVzaChkYXRhLnRvU3RyaW5nKCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHByb2Nlc3Muc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgc3RkZXJyLnB1c2goZGF0YS50b1N0cmluZygpKTtcbiAgICAgIH0pO1xuXG4gICAgICBwcm9jZXNzLm9uKCdjbG9zZScsIChjb2RlKSA9PiB7XG4gICAgICAgIGZzLnN0YXQodGhpcy5vdXRwdXRBcmd1bWVudCwgKGVyciwgc3RhdCkgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7Y29kZTogY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rkb3V0OiBzdGRvdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZGVycjogc3RkZXJyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplOiBzdGF0LnNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IHRoaXMub3V0cHV0QXJndW1lbnR9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFudXAoKSB7XG4gICAgY29uc3QgZmlsZXMgPSBbXG4gICAgICB0aGlzLnRlbXBGaWxlUGF0aCgnaGVhZGVyJyksXG4gICAgICB0aGlzLnRlbXBGaWxlUGF0aCgnY292ZXInKSxcbiAgICAgIHRoaXMudGVtcEZpbGVQYXRoKCdjb250ZW50JyksXG4gICAgICB0aGlzLnRlbXBGaWxlUGF0aCgnZm9vdGVyJyksXG4gICAgICB0aGlzLnRlbXBGaWxlUGF0aCgndG9jJywgJ3htbCcpLFxuICAgICAgdGhpcy50ZW1wRmlsZVBhdGgoJ291dHB1dCcsICdwZGYnKVxuICAgIF07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXN5bmMuZWFjaChmaWxlcywgcmltcmFmLCAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==