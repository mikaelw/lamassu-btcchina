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

var BTCChinaClient = require('btcchina');

var SATOSHI_FACTOR = Math.pow(10,8);
var FUDGE_FACTOR = 1.1;

var BTCChinaTrade = function(config) {
  this.client = new BTCChinaClient(config.key, config.secret, config.clientId);
  this._currency = config.currency || 'CNY';
};

BTCChinaTrade.factory = function factory(config) {
  return new BTCChinaTrade(config);
};

// Public functions

BTCChinaTrade.prototype.balance = function balance(callback) {
  this.client.getAccountInfo(function(err, json) {

    if (err) {
      return callback(err);
    }

    if (json.error) {
      console.dir(json.error); // DEBUG
      return callback(new Error(json.error));
    }

    callback(null, parseFloat(json.result.balance.btc.amount));
  });
};


BTCChinaTrade.prototype.currency = function currency() {
  return this._currency;
};

BTCChinaTrade.prototype.purchase = function purchase(satoshis, currentPrice, callback) {
  // TODO DEV
  var bitcoins = satoshis / SATOSHI_FACTOR;
  var price = currentPrice * FUDGE_FACTOR;
  var priceStr = price.toFixed(2);
  var amountStr = bitcoins.toFixed(8);
  this.client.buyOrder2(priceStr, amountStr, function(err, json) {
    if (err) {
      return callback(err);
    }

    if (json.error) {
      return callback(new Error(json.error));
    }

    callback(null,json.result);
  });
};

module.exports = BTCChinaTrade;
