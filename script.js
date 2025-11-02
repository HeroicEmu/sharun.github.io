        
        /**
         * Attaches drag functionality to an element using a specific handle.
         * Includes support for both mouse and touch events.
         * @param {HTMLElement} element
         * @param {HTMLElement} handle
         */
        function makeDraggable(element, handle) {
            let newX = 0, newY = 0, startX = 0, startY = 0;
            let isDragging = false;
            
            function dragStart(e) {
                if (e.type === 'touchstart' && e.touches.length !== 1) return;
                e.preventDefault(); 

                const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
                const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

                const rect = element.getBoundingClientRect();
                element.style.top = rect.top + 'px';
                element.style.left = rect.left + 'px';
                element.style.transform = 'none';

                startX = clientX;
                startY = clientY;
                isDragging = true;

                document.addEventListener('mousemove', dragMove);
                document.addEventListener('mouseup', dragEnd);
                document.addEventListener('touchmove', dragMove, { passive: false }); 
                document.addEventListener('touchend', dragEnd);
                
                handle.style.cursor = 'grabbing';
            }

            function dragMove(e) {
                if (!isDragging) return;
                
                if (e.type === 'touchmove') e.preventDefault(); 

                const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
                const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

                newX = startX - clientX; 
                newY = startY - clientY; 
                
                startX = clientX;
                startY = clientY;

                element.style.top = (element.offsetTop - newY) + 'px';
                element.style.left = (element.offsetLeft - newX) + 'px';
            }

            function dragEnd() {
                if (!isDragging) return;
                isDragging = false;

                document.removeEventListener('mousemove', dragMove);
                document.removeEventListener('mouseup', dragEnd);
                document.removeEventListener('touchmove', dragMove);
                document.removeEventListener('touchend', dragEnd);
                
                handle.style.cursor = 'grab';
            }

            // Attach listeners to the handle element (the title bar with .drag-handle)
            handle.addEventListener('mousedown', dragStart);
            handle.addEventListener('touchstart', dragStart);
        }
        
        function updateTime() {
            const now = new Date();
            const timeOptions = { 
                hour: 'numeric', 
                minute: '2-digit', 
                hour12: true 
            };
            const timeString = now.toLocaleTimeString('en-US', timeOptions);
            const fullTimeString = `The time is... ${timeString}!`;
            const timeElement = document.getElementById('live-time');
            if (timeElement) {
                timeElement.textContent = fullTimeString;
            }
        }

        /**
         * Opens a specific modal window.
         * @param {string} windowId
         */
        function openWindow(windowId) {
            const windowElement = document.getElementById(`window-${windowId}`);
            const navItem = document.getElementById(`nav-${windowId}`);
            
            if (windowElement) {
                windowElement.classList.add('active');
                
                if (navItem) {
                    navItem.classList.add('active');
                }
            }
        }

        /**
         * Closes a specific modal window.
         * @param {string} windowId
         */
        function closeWindow(windowId) {
            const windowElement = document.getElementById(`window-${windowId}`);
            const navItem = document.getElementById(`nav-${windowId}`);

            if (windowElement) {
                windowElement.classList.remove('active');
                
                if (navItem) {
                    navItem.classList.remove('active');
                }
            }
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                document.querySelectorAll('.window-overlay.active').forEach(overlay => {
                    const windowId = overlay.id.replace('window-', '');
                    closeWindow(windowId);
                });
            }
        });

        window.onload = function() {
            updateTime();
            setInterval(updateTime, 1000);
            document.querySelectorAll('.modal-functional-box').forEach(windowElement => {
                const handleElement = windowElement.querySelector('.drag-handle');
                if (handleElement) {
                    makeDraggable(windowElement, handleElement);
                }
            });
        };