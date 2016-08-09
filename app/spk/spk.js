'use strict'

angular.module('myApp.spk', ['ngRoute', 'ngTable', 'chart.js', 'ngMaterial', 'md-steppers'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/spk', {
    templateUrl: 'spk/spk.html',
    controller: 'SpkController as vm'
  })
}])

.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark()
})

.controller('SpkController', ['$scope', 'NgTableParams', function (sc, ngTableParams) {
  var self = this

  // Stepper's configs
  self.selectedStep = 0
  self.step = {
    one: { completed: false },
    two: { completed: false, disabled: true }
  }

  // Tables
  var candidates = [
    { name: 'Anggi', c1: 80, c2: 100, c3: 10, c4: 8, c5: 8, c6: 200, sVector: 0, vVector: 0 },
    { name: 'Audri', c1: 75, c2: 90, c3: 2, c4: 8, c5: 10, c6: 180, sVector: 0, vVector: 0 },
    { name: 'Wisnu', c1: 95, c2: 80, c3: 8, c4: 6, c5: 6, c6: 200, sVector: 0, vVector: 0 },
    { name: 'Althaf', c1: 90, c2: 85, c3: 6, c4: 8, c5: 8, c6: 220, sVector: 0, vVector: 0 },
    { name: 'Salsa', c1: 85, c2: 95, c3: 4, c4: 6, c5: 8, c6: 160, sVector: 0, vVector: 0 },
    { name: 'Bima', c1: 90, c2: 80, c3: 6, c4: 8, c5: 8, c6: 180, sVector: 0, vVector: 0 }]
  self.candidatesTableParams = new ngTableParams({}, { counts: [], dataset: candidates })

  var weights = [
    { code: 'C1', desc: 'Datang Tepat Waktu', type: 'Benefit', point: 20 },
    { code: 'C2', desc: 'Nilai Test Product Knowledge', type: 'Benefit', point: 20 },
    { code: 'C3', desc: 'Jumlah Cuti Sakit', type: 'Cost', point: 20 },
    { code: 'C4', desc: 'Evaluasi Kerapihan Kerja', type: 'Benefit', point: 15 },
    { code: 'C5', desc: 'Penilaian Rekan Kerja', type: 'Benefit', point: 10 },
    { code: 'C6', desc: 'Volume Penjualan', type: 'Benefit', point: 15 }]
  self.weightsTableParams = new ngTableParams({}, { counts: [], dataset: weights })

  // Charts
  self.normalizedWeightLabels = weights.map(function (w) { return w.desc })
  self.normalizedWeightData = []

  self.cadidateNames = candidates.map(function (c) { return c.name })
  self.svVectorLabels = self.cadidateNames
  self.sVectorSeries = ['S Vektor']
  self.sVectorValues = []

  self.vVectorSeries = ['V Vektor']
  self.vVectorValues = []

  self.criteriaLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running']
  self.criteriaScores = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100],
    [31, 46, 56, 42, 17, 30, 99]
  ]

  // Methods
  self.calculate = function () {
    self.step.one.completed = true
    self.step.two.disabled = false
    self.selectedStep = 1

    // Calculate Normalized Weight
    var weightTotal = 0
    weights.forEach(function (w) {
      weightTotal += w.point
    })
    self.normalizedWeightData = weights.map(function (w) {
      return w.point / weightTotal
    })

    // Calculate S Vectors
    self.sVectorValues = [ candidates.map(function (c) {
      var resC1 = Math.pow(c.c1, self.isBenefit(weights[0].type) ? self.normalizedWeightData[0] : (self.normalizedWeightData[0] * -1))
      var resC2 = Math.pow(c.c2, self.isBenefit(weights[1].type) ? self.normalizedWeightData[1] : (self.normalizedWeightData[1] * -1))
      var resC3 = Math.pow(c.c3, self.isBenefit(weights[2].type) ? self.normalizedWeightData[2] : (self.normalizedWeightData[2] * -1))
      var resC4 = Math.pow(c.c4, self.isBenefit(weights[3].type) ? self.normalizedWeightData[3] : (self.normalizedWeightData[3] * -1))
      var resC5 = Math.pow(c.c5, self.isBenefit(weights[4].type) ? self.normalizedWeightData[4] : (self.normalizedWeightData[4] * -1))
      var resC6 = Math.pow(c.c6, self.isBenefit(weights[5].type) ? self.normalizedWeightData[5] : (self.normalizedWeightData[5] * -1))

      // console.log(c.name + " res: " + resC1 + " " + resC2 + " " + resC3 + " " + resC4 + " " + resC5 + " " + resC6)
      var result = resC1 * resC2 * resC3 * resC4 * resC5 * resC6
      c.sVector = result
      return result
    })]

    // Calculate V Vectors
    var sVectorTotal = 0
    self.sVectorValues[0].forEach(function (v) {
      sVectorTotal += v
    })
    self.vVectorValues = [ candidates.map(function (c) {
      var result = c.sVector / sVectorTotal
      c.vVector = result
      return result
    })]

    // Highest Result
    var bestScore = Math.max.apply(Math, candidates.map(function (c) { return c.vVector }))
    self.bestCandidate = candidates.find(function (c) { return c.vVector === bestScore })
    console.log(self.bestCandidate)
  }

  self.isBenefit = function (type) {
    return type === 'Benefit'
  }
}])
