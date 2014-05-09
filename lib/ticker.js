/*
* THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED
* WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
* OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT,
* INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
* HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
* STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
* IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var jsonquest = require('jsonquest');
var async = require('async');

// var BTCChinaTickerClient = require('btcchina');

var BTCChinaTicker = function(config) {
  this.config = config;
  // this.client = new BTCChinaTickerClient();
};

BTCChinaTicker.factory = function factory(config) {
  return new BTCChinaTicker(config);
};

function fetchTicker(currency, callback) {

  if (currency === 'CNY') {
    jsonquest({
      host: 'data.btcchina.com',
      path: '/data/ticker',
      method: 'GET',
      protocol: 'https'
    }, function (err, response, result) {
      if (err) return callback(err);
      var rate = null;
      try {
        rate = result.ticker.last;
      } catch (ex) {
        return callback(new Error('Could not parse BTC China ticker response.'));
      }
      callback(null, {currency: currency, rate: rate});
    });
  }
  else{
    return callback(new Error(currency +' currency not supported.'));
  }

}

BTCChinaTicker.prototype.ticker = function ticker(currencies, callback) {
  async.map(currencies, fetchTicker, function (err, results) {
    if (err) return callback(err);
    var formattedResult = {};
    results.forEach(function (result) {
      formattedResult[result.currency] = result;
    });
    return callback(null, formattedResult);
  });
};


module.exports = BTCChinaTicker;
