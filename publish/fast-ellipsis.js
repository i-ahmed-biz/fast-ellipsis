(function (angular) {

/**
 *	Angular library for truncating multi-line text by checking the text container height
 *
 *	@directive fast-ellipsis(fastEllipsis) (Need the arrtibute directive to use the functionality) REQUIRED
 *	@parameter ellipsis-text (ellipsisText) (HTML/normal text that have to be truncated) REQUIRED 
 *	@parameter ellipsis-truncate-text (ellipsisTruncateText) (The HTML/string that will be added after truncate, 
 *             if its not used then default (...) will be added) OPTIONAL
 *	@use <p fast-ellipsis ellipsis-text="HTML/normal text"></p>
 *	@use <p fast-ellipsis ellipsis-text="HTML/normal text" ellipsis-truncate-text = "HTML/Text truncate texts."></p>
 *
 */
  // Config
  angular.module('thls.fast-ellipsis.config', [])
      .value('thls.fast-ellipsis.config', {
          debug: true
      });

  // Modules
  angular.module('thls.fast-ellipsis',['thls.fast-ellipsis.config'])
    .directive('fastEllipsis', ['$window', '$timeout', function($window, $timeout) {
    return {
      restrict: 'A',
      scope: {
        ellipsisText: '=',
        ellipsisTruncateText: '@'  
      },
      compile: function(elem, attr, linker) {

        return function(scope, element, attributes) {
         
          function checkOverflow(element) {
              return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
          }

          function findLastOverflowIndex(overflowNode, checkStr) {
            var lastOverflowedIndex = checkStr.length - 1;
            var stack = [];
            var beg;
            var end;
            var mid;
            var stackItem;
            var overflowElem = angular.element(overflowNode);
              
            overflowElem.html(checkStr.slice(0, lastOverflowedIndex + 1)); 
              
            if (!checkOverflow(overflowNode)) {
              return lastOverflowedIndex;
            }

            end = lastOverflowedIndex;
            stack.push({
              'beg': 0,
              'end': end
            });

            while (stack.length > 0) {
              stackItem = stack.pop();
              beg = stackItem.beg;
              end = stackItem.end;
   
              mid = Math.floor((beg + end) / 2);
              overflowElem.html(checkStr.slice(0, mid + 1));

              if (checkOverflow(overflowNode)) {
                if (mid < lastOverflowedIndex) {
                  lastOverflowedIndex = mid;
                }
                end = mid - 1;
              } else {
                beg = mid + 1;
              }

              if (mid < end) {
                stack.push({
                  'beg': beg,
                  'end': end
                });
              }
            }
            return lastOverflowedIndex;
          }
            
          function careateEllipsis() {
            var binding = scope.ellipsisText;
            
            if (!binding) {
              return;
            }
            
            var isOverFlow = false;

            var clonedNode = element[0].cloneNode(true);
            var clonedElem = angular.element(clonedNode);
   
            clonedNode.style.height = element[0].clientHeight + 'px';
            clonedNode.style.width = element[0].clientWidth + 'px';

            clonedNode.style.visibility = 'hidden';
            element[0].parentNode.appendChild(clonedNode);  
 
            var indexInData;
            indexInData = findLastOverflowIndex(clonedNode, binding);

            isOverFlow = checkOverflow(clonedNode);
           
            var truncStr = binding + '';
            
            if(!scope.ellipsisTruncateText)  {
              scope.ellipsisTruncateText = '...';  
            }

            while (isOverFlow && indexInData >= 0) {
              indexInData--;
              truncStr = truncStr.slice(0, indexInData + 1);
              truncStr = truncStr + scope.ellipsisTruncateText;
              clonedElem.html(truncStr);  
              isOverFlow = checkOverflow(clonedNode);
            }

            element.html(truncStr);
 
            element[0].parentNode.removeChild(clonedNode);
          }

          function careateEllipsisInTimer() {
            $timeout(function() {
                careateEllipsis();
              }
            );
          }
          
          scope.$watch('ellipsisText', function() {
            careateEllipsisInTimer();
          });
    
          function onWindowResize() {   
            careateEllipsisInTimer();
          }

          var window = angular.element($window);
          window.bind('resize', onWindowResize);

          scope.$on('$destroy', function() {
            window.unbind('resize', onWindowResize);
          });
        };
      }
    };
  }]);

})(angular);
