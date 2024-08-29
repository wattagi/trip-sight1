
function showDetails(memberId) {
    const details = document.querySelectorAll('.detail-content');
    details.forEach(detail => {
        if (detail.id === memberId) {
            detail.style.display = 'block';
        } else {
            detail.style.display = 'none';
        }
    });
}
