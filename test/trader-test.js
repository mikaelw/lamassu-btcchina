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

var config = {};
config.key = 'BTCCHINA_API_ACCESS_KEY'; 
config.secret = 'BTCCHINA_API_SECRET_KEY'; 

var test = require('tap').test;
var Trader = require('../lib/trader').factory(config);

test('Read account balance from BTCChina', function(t){
    Trader.balance(function(err, result) {
        t.plan(5);
        t.equal(err, null, 'There should be no error');
        t.notEqual(result, null, 'There should be a result');
        t.equal(result.error, undefined, 'The result should contain no error');
        t.notEqual(result, undefined, 'A rate should have been returned');
        t.ok( !isNaN(parseFloat(result)) && isFinite(result), 'The rate should be a number');
        t.end();
    });
});


test('Purchase Bitcoins from BTCChina', function(t){
    // var btcchina = new trader(config);
    Trader.purchase(100000000,2000,function(err, result) {
        t.plan(5);
        t.equal(err, null, 'There should be no error');
        t.notEqual(result, null, 'There should be a result');
        t.equal(result.error, undefined, 'The result should contain no error');
        t.notEqual(result, undefined, 'A rate should have been returned');
        t.ok( !isNaN(parseFloat(result)) && isFinite(result), 'The rate should be a number');
        t.end();
    });
});